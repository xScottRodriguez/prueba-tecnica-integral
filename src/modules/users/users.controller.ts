import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseHandler } from 'src/common/response.handler';
import { GetUser } from 'src/decorators';
import { UserEntity } from './entities/user.entity';
import { ResponseDto } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@GetUser() user: UserEntity) {
    try {
      console.log('user', user);
      return this.responseHandler.success(
        HttpStatus.OK,
        user,
        'User profile retrieved successfully.',
      );
    } catch (error) {
      throw new InternalServerErrorException(
        error.message ?? 'Error retrieving user profile',
      );
    }
  }
}
