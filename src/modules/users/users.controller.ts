import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHandler } from 'src/common/response.handler';
import { GetUser } from 'src/decorators';
import { UserEntity } from './entities/user.entity';
import { ResponseDto } from 'src/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UserDto } from './entities/dto/user.dto';

@ApiBearerAuth()
@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly responseHandler: ResponseHandler) {}

  @ApiOkResponse({
    description: 'User profile retrieved successfully.',
    type: ResponseDto<UserEntity>,
  })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: UserEntity) {
    const userDto = new UserDto(user);
    return this.responseHandler.success(
      HttpStatus.OK,
      userDto,
      'User profile retrieved successfully.',
    );
  }
}
