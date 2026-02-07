import { IUser } from 'src/user/model/user.model';
import { IGroup } from '../../group/model/group.model';
import { ISpecialty } from '../../specialty/model/specialty.model';
import { IYear } from '../../year/model/year.model';
import { ISubject } from 'src/university/subject/model/subject.model';

export interface ITimeTable {
  hours: string;
  days: string;
  group: IGroup;
  year: IYear;
  specialty: ISpecialty;
  subject: ISubject;
  teacher: IUser;
}
