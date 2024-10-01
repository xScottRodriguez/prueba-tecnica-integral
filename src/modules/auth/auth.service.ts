import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserEntity } from '../users/entities/user.entity';
import { Repositories } from 'src/config';
import { LoginDto } from './dto';
import { EncoderService } from './encoder.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject(Repositories.User) private readonly repository: typeof UserEntity,
    private readonly encoderService: EncoderService,
  ) {}

  async signIn(user: LoginDto): Promise<UserEntity> {
    try {
      const userFound: UserEntity = await this.userService.findByEmail(
        user.email,
      );
      if (!userFound) throw new UnprocessableEntityException('User not found');

      const isPasswordValid: boolean =
        await this.encoderService.comparePassword(
          user.password,
          userFound.password,
        );

      if (!isPasswordValid)
        throw new InternalServerErrorException('Invalid password');

      return userFound.toJSON();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signUp(user: CreateUserDto): Promise<UserResponseDto> {
    try {
      const userCreated: UserEntity = await this.repository.create(user);
      return userCreated.toJSON();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
