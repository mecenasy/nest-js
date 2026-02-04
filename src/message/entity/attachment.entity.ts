import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAttachment } from '../model/attachment.model';

@Entity()
export class Attachment implements IAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  originalName: string;

  @ManyToOne(() => Message, (message) => message.files, {
    onDelete: 'CASCADE',
  })
  message: Message;
}
