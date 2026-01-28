import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { User } from '../../user/entity/user.entity';
import { IPerson } from '../model/person.model';
import { Address } from './address.entity';

@Entity()
export class Person implements IPerson {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  surname: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  @Expose()
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  photo?: string;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @OneToOne(() => User, (user) => user.person, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Address, (address) => address.person, {
    cascade: true,
    nullable: false,
  })
  address: Address;
}
