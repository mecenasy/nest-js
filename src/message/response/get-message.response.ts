import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FileRes {
  constructor(partial: Partial<FileRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  path: string;
}
export class GetMessageResponse {
  constructor(partial: Partial<GetMessageResponse>) {
    Object.assign(this, partial);
  }
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  from: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => GetMessageResponse)
  replies?: GetMessageResponse[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  to: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ValidateNested()
  @Type(() => FileRes)
  files?: FileRes[];
}
