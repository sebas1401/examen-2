import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  findAllByUser(userId: number) {
    return this.repo.find({ where: { user: { id: userId } }, order: { id: 'ASC' } });
  }

  async findOneByUser(id: number, userId: number) {
    const task = await this.repo.findOne({ where: { id, user: { id: userId } } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(dto: CreateTaskDto, userId: number) {
    const task = this.repo.create({ ...dto, user: { id: userId } as any });
    return this.repo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.findOneByUser(id, userId);
    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.findOneByUser(id, userId);
    await this.repo.remove(task);
    return { deleted: true };
  }
}
