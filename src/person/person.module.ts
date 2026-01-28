import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { AddressService } from './address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { Address } from './entity/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Address])],
  controllers: [],
  providers: [PersonService, AddressService],
  exports: [PersonService],
})
export class PersonModule {}
