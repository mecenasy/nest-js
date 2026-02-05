import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class SimpleUserResponse {
  constructor(partial: Partial<SimpleUserResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  fullName: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  photo: string;
}
