import { IsString, IsArray } from 'class-validator';
import { IDto } from '../model/dto.model';

export class CreateYearDto implements IDto {
  @IsString()
  name: string;

  // @IsArray()
  // directions: string[];

  // @IsArray()
  // specialties: string[];

  @IsArray()
  groups: string[];
}
