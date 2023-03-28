import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { TaskFilterDto } from './tasks.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(taskFilter: TaskFilterDto): Promise<Task[]> {
    const { status, search } = taskFilter;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
