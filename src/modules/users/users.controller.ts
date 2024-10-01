import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { ResponseHandler } from 'src/common/response.handler';
import { IResponse } from 'src/common/interfaces';
import { ResponseDto } from 'src/common/dto/response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @ApiOkResponse({ type: ResponseDto<UserResponseDto> })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(
    @Body() user: CreateUserDto,
  ): Promise<IResponse<UserResponseDto>> {
    const data: UserResponseDto = await this.userService.create(user);
    return this.responseHandler.success(
      HttpStatus.CREATED,
      data,
      'User created successfully',
    );
  }
}
