import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { splitElementByComa } from 'src/decorators/helper/split-element-by-coma';

export class GetStudentsParams {
  @IsOptional()
  @IsString()
  @Transform(splitElementByComa)
  directions: string[];

  @IsOptional()
  @IsString()
  @Transform(splitElementByComa)
  specialties: string[];

  @IsOptional()
  @IsString()
  @Transform(splitElementByComa)
  group: string[];

  @IsOptional()
  @IsString()
  @Transform(splitElementByComa)
  years: string[];
}
