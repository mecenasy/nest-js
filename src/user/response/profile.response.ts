import { Expose } from 'class-transformer';
import { User } from '../entity/user.entity';
import { PersonResponse } from 'src/person/response/person.response';
import { StudentResponse } from 'src/student/response/student.response';
import { IsOptional, ValidateNested } from 'class-validator';

export class ProfileResponse extends PersonResponse {
  constructor(partial?: Partial<User>) {
    super(partial?.person);
    if (partial) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { person, ...rest } = partial;
      Object.assign(this, rest);
    }
  }

  @Expose()
  id: string;

  @Expose()
  @ValidateNested()
  @IsOptional()
  student?: StudentResponse;
}
