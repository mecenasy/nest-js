import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { WrongTaskStatusException } from './exception/wrong-task-status-exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  public async getTasks(): Promise<ITask[]> {
    return await this.taskRepository.find();
  }

  public async getTaskById(id: string): Promise<ITask | null> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  public async createTask(task: CreateTaskDto): Promise<ITask> {
    return await this.taskRepository.save(task);
  }

  public async updateTask(
    task: ITask,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    const isStatusTransition = this.isVallationStatusTransition(
      task.status,
      updateTaskDto.status,
    );

    if (task.status && !isStatusTransition) {
      throw new WrongTaskStatusException();
    }

    return await this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  public async deleteTask(task: ITask): Promise<void> {
    await this.taskRepository.delete(task);
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
