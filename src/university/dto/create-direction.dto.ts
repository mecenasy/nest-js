import { IsString, IsArray } from 'class-validator';
import { IDto } from '../model/dto.model';

export class CreateDirectionDto implements IDto {
  @IsString()
  name: string;

  @IsArray()
  specialties: CreateSpecialty[];

  @IsArray()
  years: string[];
}

export class CreateSpecialty implements IDto {
  @IsString()
  name: string;

  @IsArray()
  groups: CreateGroup[];

  @IsArray()
  years: string[];
}

export class CreateGroup implements IDto {
  @IsString()
  name: string;

  @IsArray()
  years: string[];
}
