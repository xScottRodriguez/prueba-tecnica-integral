import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repositories } from '../../config';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
@Injectable()
export class UsersService {
  #logger = new Logger(UsersService.name);
  constructor(
    @Inject(Repositories.User) private readonly repository: typeof UserEntity,
  ) {}

  async create(user: CreateUserDto): Promise<UserResponseDto> {
    try {
      const userCreated: UserEntity = await this.repository.create(user);
      return userCreated.toJSON();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
