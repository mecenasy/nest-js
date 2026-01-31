import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IStudent } from '../model/student.model';

export class StudentResponse implements Omit<IStudent, 'active'> {
  constructor(partial: Partial<IStudent>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  album: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  direction: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  group: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  year: string;
}
