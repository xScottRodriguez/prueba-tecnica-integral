import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProvider } from './user.provider';
import { ResponseHandler } from 'src/common/response.handler';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...userProvider, ResponseHandler],
})
export class UsersModule {}
