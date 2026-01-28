import { IsNotEmpty, IsString } from 'class-validator';
import { IAddress } from '../model/address.model';

export class CreateAddressDto implements IAddress {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
