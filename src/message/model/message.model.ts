import { IUser } from 'src/user/model/user.model';
import { IAttachment } from './attachment.model';

export interface IMessage {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  from: IUser;
  to: IUser;
  parent?: IMessage;
  replies?: IMessage[];
  files?: IAttachment[];
  isReaded: boolean;
}
