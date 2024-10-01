import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProvider } from './user.provider';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...userProvider],
})
export class UsersModule {}
