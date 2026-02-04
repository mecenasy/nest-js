import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
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
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to', 'files'],
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    const tree = await this.dataSource
      .getTreeRepository(Message)
      .findDescendantsTree(message, {
        relations: ['from', 'to', 'files'],
      });

    if (!tree) {
      throw new NotFoundException('Message not found');
    }

    return tree;
  }

  public async getMessages(userId: string): Promise<[Message[], number]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.parent', 'parent')
      .select(['message.id', 'message.title', 'message.isReaded'])
      .where('message.fromId = :userId', { userId })
      .andWhere('message.parent IS NULL')
      .orderBy('message.createdAt', 'DESC')
      .getManyAndCount();

    return messages;
  }
}
