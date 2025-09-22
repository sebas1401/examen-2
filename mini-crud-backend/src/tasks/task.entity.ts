import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column({ type: 'text', nullable: true }) description?: string;

  @Column({ default: false }) done: boolean;

  @CreateDateColumn() createdAt: Date;

  @ManyToOne(() => User, (u) => u.tasks, { onDelete: 'CASCADE' })
  user: User;
}
