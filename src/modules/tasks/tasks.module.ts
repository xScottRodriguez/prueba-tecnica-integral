import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { TaskProvider } from './task.provider';
@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...TaskProvider],
})
export class TasksModule {}
