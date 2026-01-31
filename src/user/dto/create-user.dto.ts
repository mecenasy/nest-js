import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePersonDto } from '../../person/dto/person.dto';
import { CreateAddressDto } from '../../person/dto/address.dto';
import { Type } from 'class-transformer';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
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
  password: string = 'Pass123#';

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStudentDto)
  student?: CreateStudentDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
