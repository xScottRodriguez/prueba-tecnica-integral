import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { taskProvider } from './task.provider';
@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProvider],
})
export class TasksModule {}
