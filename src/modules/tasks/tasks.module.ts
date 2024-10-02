import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { taskProvider } from './task.provider';
import { ResponseHandler } from 'src/common/response.handler';
@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProvider, ResponseHandler],
})
export class TasksModule {}
