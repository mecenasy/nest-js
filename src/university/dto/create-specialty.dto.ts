import { IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IDto } from '../model/dto.model';

export class CreateSpecialtyDto implements IDto {
  @IsString()
  name: string;

  @IsString()
  direction: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGroup)
  groups: CreateGroup[];

  @IsOptional()
  @IsArray()
  years: string[];
}

export class CreateGroup implements IDto {
  @IsString()
  name: string;

  @IsArray()
  years: string[];
}
