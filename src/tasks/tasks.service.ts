import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { WrongTaskStatusException } from './exception/wrong-task-status-exception';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  public getTasks(): ITask[] {
    return this.tasks;
  }

  public getTaskById(id: string): ITask | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  public createTask(task: CreateTaskDto): ITask {
    const newTask: ITask = {
      id: randomUUID(),
      ...task,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  public updateTask(task: ITask, updateTaskDto: UpdateTaskDto): ITask {
    const isStatusTransition = this.isVallationStatusTransition(
      task.status,
      updateTaskDto.status,
    );

    if (task.status && !isStatusTransition) {
      throw new WrongTaskStatusException();
    }

    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = { ...task, ...updateTaskDto };
    }
    return this.tasks[index];
  }

  public deleteTask(task: ITask): void {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }
  private isVallationStatusTransition(
    fromStatus: TaskStatus,
    toStatus?: TaskStatus,
  ): boolean {
    const statusOrder: Array<TaskStatus | undefined> = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    return statusOrder.indexOf(fromStatus) <= statusOrder.indexOf(toStatus);
  }
}
