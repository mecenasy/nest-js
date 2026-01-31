import { Expose } from 'class-transformer';
import { IAddress } from '../model/address.model';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddressResponse implements IAddress {
  constructor(partial: Partial<IAddress>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  street: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  number: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
