import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IPerson } from '../model/person.model';
import { Type } from 'class-transformer';

export class CreatePersonDto implements IPerson {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  phone: number;
}
