import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITask, TaskStatus } from '../model/task.model';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;
}
