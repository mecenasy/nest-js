import { IGroup } from 'src/university/group/model/group.model';
import { ISpecialty } from 'src/university/specialty/model/specialty.model';
import { IYear } from 'src/university/year/model/year.model';
import { IUser } from 'src/user/model/user.model';

export interface ISubject {
  name: string;
  auditorium: string;
  teacher: IUser;
  groups: IGroup[];
  years: IYear[];
  specialty: ISpecialty;
}
