import { IsString, IsArray } from 'class-validator';
import { IDto } from '../model/dto.model';

export class CreateGroupDto implements IDto {
  @IsString()
  name: string;

  @IsString()
  specialty: string;

  @IsArray()
  years: string[];
}
