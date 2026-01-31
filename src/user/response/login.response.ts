import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class AuthRes {
  constructor(partial: Partial<AuthRes>) {
    Object.assign(this, partial);
  }
  @Expose()
  expireAt: string;

  @Expose()
  token: string;
}

export class UserRes {
  constructor(partial: Partial<UserRes>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;

  @Expose()
  userId: string;

  @Expose()
  role: string;

  @Expose()
  isDefaultPassword?: boolean;
}

export class LoginResponse {
  constructor(partial: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ValidateNested()
  @Type(() => AuthRes)
  auth: AuthRes;

  @Expose()
  @ValidateNested()
  @Type(() => UserRes)
  user: UserRes;
}
