import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetMessagesResponse {
  constructor(partial: Partial<GetMessagesResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MessageRes)
  messages: MessageRes[];

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class MessageRes {
  constructor(partial: Partial<MessageRes>) {
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
  @IsBoolean()
  isReaded: boolean;
}
