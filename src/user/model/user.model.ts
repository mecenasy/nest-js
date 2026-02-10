import { IPerson } from '../../person/model/person.model';
import { IHashedPassword } from '../password/hashed-password.model';
import { IRole } from './role.model';

export interface IUser {
  id: string;
  email: string;
  createTime: Date;
  updateTime: Date;
  password: IHashedPassword;
  roles: IRole[];
  personId?: IPerson;
  person?: IPerson;
}
