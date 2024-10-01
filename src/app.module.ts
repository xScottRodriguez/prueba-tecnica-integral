import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './modules/database/database.module';
@Module({
  imports: [TasksModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
