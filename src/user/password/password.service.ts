import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { IHashedPassword } from './hashed-password.model';

@Injectable()
export class PasswordService {
  public validatePassword(
    password: string,
    { salt, hash }: IHashedPassword,
  ): boolean {
    const hashVerify = bcrypt.hashSync(password, salt);

    return hashVerify === hash;
  }

  public generatePassword(password: string): IHashedPassword {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return {
      salt,
      hash,
    };
  }
}
