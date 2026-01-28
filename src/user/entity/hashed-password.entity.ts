import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IHashedPassword } from '../password/hashed-password.model';
import { User } from './user.entity';

@Entity()
export class HashedPassword implements IHashedPassword {
  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @OneToOne(() => User, (user) => user.password, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
