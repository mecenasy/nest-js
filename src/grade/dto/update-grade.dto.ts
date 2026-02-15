import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateGradeDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  grade: string;
}
