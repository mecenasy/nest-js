import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMessageResponse {
  constructor(partial: Partial<SendMessageResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

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
  @IsString()
  @IsNotEmpty()
  to: string;

  @Expose()
  @IsString()
  @IsOptional()
  parent?: string;

  @Expose()
  @IsString()
  @IsArray()
  @IsOptional()
  files?: string[];
}
