import { IHashedPassword } from '../password/hashed-password.model';

export interface IUser {
  id: string;
  name: string;
  email: string;
  createTime: Date;
  updateTime: Date;
  password: IHashedPassword;
}
