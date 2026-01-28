import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IPerson } from '../model/person.model';

export class CreatePersonDto implements IPerson {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsOptional()
  photo?: string;
}
