import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { IAddress } from '../model/address.model';
import { Person } from './person.entity';

@Entity()
export class Address implements IAddress {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  city: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  country: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  @Expose()
  number: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  street: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  @Expose()
  zipCode: string;

  @PrimaryColumn({ type: 'uuid' })
  personId: string;

  @OneToOne(() => Person, (person) => person.address, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'personId' })
  person: Person;
}
