import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
@Tree('materialized-path')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.receiveMessages, {
    nullable: false,
  })
  from: User;

  @ManyToOne(() => User, (user) => user.sendMessages, {
    nullable: false,
  })
  to: User;

  @TreeParent()
  @IsOptional()
  parent?: Message;

  @TreeChildren()
  @IsOptional()
  replies: Message[];

  @OneToMany(() => Attachment, (file) => file.message, {
    cascade: true,
  })
  @IsOptional()
  files?: Attachment[];

  @Column({ default: false })
  @IsBoolean()
  isReaded: boolean;
}
