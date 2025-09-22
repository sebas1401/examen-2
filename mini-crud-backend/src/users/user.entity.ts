import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true }) email: string;

  @Column() password: string;

  @CreateDateColumn() createdAt: Date;

  @OneToMany(() => Task, (t) => t.user) tasks: Task[];
}
