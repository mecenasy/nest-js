import { IsNotEmpty, IsString } from 'class-validator';

export class GetByGroupParams {
  @IsString()
  @IsNotEmpty()
  yearId: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}
