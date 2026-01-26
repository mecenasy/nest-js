import { ITaskLabel } from './task-label.model';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  labels?: ITaskLabel[];
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
