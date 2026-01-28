import { Injectable } from '@nestjs/common';
import { IAddress } from './model/address.model';
import { IPerson } from './model/person.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { Repository } from 'typeorm';
import { Address } from './entity/address.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public create(person: IPerson, address: IAddress): Person {
    const personEntity = this.createPerson(person);
    const addressEntity = this.createAddress(address);

    personEntity.address = addressEntity;
    addressEntity.person = personEntity;

    return personEntity;
  }

  private createAddress(address: IAddress): Address {
    return this.addressRepository.create(address);
  }

  private createPerson(person: IPerson): Person {
    return this.personRepository.create(person);
  }
}
