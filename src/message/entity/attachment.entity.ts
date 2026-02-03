import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ManyToOne(() => Message, (message) => message.files, {
    onDelete: 'CASCADE',
  })
  message: Message;
}
