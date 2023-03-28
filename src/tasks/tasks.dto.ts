import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from './taskStatus.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class TaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
