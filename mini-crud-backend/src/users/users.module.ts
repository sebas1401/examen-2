import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  // Exporta el repositorio y el service para que Auth/otros lo usen
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
