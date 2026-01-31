import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PersonResponse } from 'src/person/response/person.response';
import { StudentResponse } from 'src/student/response/student.response';

export class RegisterUserResponse {
  constructor(partial: Partial<RegisterUserResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsOptional()
  @Expose()
  image?: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => StudentResponse)
  student?: StudentResponse;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PersonResponse)
  person: PersonResponse;
}
