import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor() {}

  @Get()
  findAll() {
    return 'This action returns all users';
  }
}
