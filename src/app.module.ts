import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [TasksModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
