import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { CreateTaskDto, TaskFilterDto } from './tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks(taskFilter: TaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = taskFilter;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const searchedTask = await this.taskRepository.findOne({
      where: { id, user },
    });
    if (!searchedTask) {
      throw new NotFoundException('The Task not found!');
    }
    return searchedTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const updatedTask = await this.getTaskById(id, user);
    updatedTask.status = status;
    await this.taskRepository.save(updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string, user: User): Promise<string> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException('The Task not found!');
    }
    return 'Task Deleted';
  }
}
