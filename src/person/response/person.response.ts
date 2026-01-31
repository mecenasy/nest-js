import { Expose, Type } from 'class-transformer';
import { IPerson } from '../model/person.model';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressResponse } from './address.response';

export class PersonResponse implements IPerson {
  constructor(partial?: Partial<IPerson>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;

  @Expose()
  @ValidateNested()
  @Type(() => AddressResponse)
  address: AddressResponse;
}
