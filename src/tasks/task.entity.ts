import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './taskStatus.enum';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  userId: string;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @Exclude({ toPlainOnly: true })
  user: User;
}
