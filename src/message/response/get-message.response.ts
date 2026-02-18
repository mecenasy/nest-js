import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class UserRes {
  constructor(partial: Partial<UserRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}
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
  @IsUUID()
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
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserRes)
  from: UserRes;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserRes)
  to: UserRes;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => GetMessageResponse)
  replies?: GetMessageResponse[];

  @Expose()
  @IsString()
  @IsOptional()
  @ValidateNested()
  @Type(() => FileRes)
  files?: FileRes[];

  @Expose()
  @IsBoolean()
  isRead: boolean;
}
