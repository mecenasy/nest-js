import { Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { Message } from './entity/message.entity';
import { User } from 'src/user/entity/user.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './entity/attachment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  public async saveMessage(
    message: SendMessageDto,
    files: Array<Express.Multer.File>,
    id: string,
  ): Promise<Message> {
    const [user, userTo] = await Promise.all([
      this.userRepository.findOneBy({ id }),
      this.userRepository.findOneBy({ id: message.to }),
    ]);

    if (!(user && userTo)) {
      throw new NotFoundException('User not found');
    }
    const createMessage = this.messageRepository.create({
      title: message.title,
      content: message.content,
      from: user,
      to: userTo,
    });

    if (message.parent) {
      const parent = await this.messageRepository.findOne({
        where: { id: message.parent },
      });

      if (!parent) {
        throw new NotFoundException('Parent message not found');
      }
      createMessage.parent = parent;
    }

    if (files && files.length > 0) {
      const attachments = files.map((file) =>
        this.attachmentRepository.create({
          name: file.filename,
          originalName: file.originalname,
        }),
      );
      createMessage.files = attachments;
    }

    return this.messageRepository.save(createMessage);
  }

  public async getMessageById(id: string): Promise<Message> {
    const repo = this.dataSource.getTreeRepository(Message);
    const message = await repo.findOne({
      where: { id },
      relations: ['parent'],
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    const ancestors = await repo.findAncestors(message, {
      relations: ['parent'],
    });
    const rootNode = ancestors.find((m) => !m.parent) || message;

    const root = await repo.findOne({
      where: { id: rootNode.id },
      relations: ['from', 'to', 'files'],
    });

    if (!root) {
      throw new NotFoundException('Message not found');
    }

    const tree = await repo.findDescendantsTree(root, {
      relations: ['from', 'to', 'files'],
    });

    return tree;
  }

  public async getMessages(userId: string): Promise<[Message[], number]> {
    const qb = this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.parent', 'parent')
      .select([
        'message.id',
        'message.title',
        'message.isRead',
        'message.createdAt',
        'parent.id',
      ])
      .addSelect(
        `(NOT EXISTS (
          SELECT 1 FROM message c 
          WHERE c.mpath LIKE message.mpath || '%' 
          AND c."toId" = :userId 
          AND c."isRead" = false
        ))`,
        'is_thread_read',
      )
      .where(
        new Brackets((qr) => {
          qr.where('message.fromId = :userId', { userId }).orWhere(
            'message.toId = :userId',
            { userId },
          );
        }),
      )
      .andWhere('message.parent IS NULL')
      .orderBy('message.createdAt', 'DESC')
      .setParameter('userId', userId);

    const { entities, raw } = await qb.getRawAndEntities();
    const count = await qb.getCount();

    entities.forEach((entity, index) => {
      if (raw[index]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        entity.isRead = !!raw[index].is_thread_read;
      }
    });

    return [entities, count];
  }

  public async getUnReadMessage(userId: string): Promise<number> {
    const count = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.toId = :userId', { userId })
      .andWhere('message.isRead = :isRead', { isRead: false })
      .getCount();

    return count;
  }

  public async setReadMessage(
    userId: string,
    messageId: string,
  ): Promise<Message> {
    const message = await this.messageRepository.findOneBy({
      id: messageId,
      to: { id: userId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    message.isRead = true;

    return await this.messageRepository.save(message);
  }
}
