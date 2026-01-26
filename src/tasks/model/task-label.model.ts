import { ITask } from './task.model';

export interface ITaskLabel {
  id: string;
  name: string;
  taskId: string;
  task: ITask;
  createdAt: Date;
  updatedAt: Date;
}
