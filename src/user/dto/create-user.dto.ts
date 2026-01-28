import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CreatePersonDto } from '../../person/dto/person.dto';
import { CreateAddressDto } from '../../person/dto/address.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least 1 number',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Password must contain at least 1 special character',
  })
  password: string;

  @IsNotEmpty()
  person: CreatePersonDto;

  @IsNotEmpty()
  address: CreateAddressDto;
}
