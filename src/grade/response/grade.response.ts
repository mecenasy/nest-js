import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GradeResponse {
  constructor(partial: Partial<GradeResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  grade: string;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
