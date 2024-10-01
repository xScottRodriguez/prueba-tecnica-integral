import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repositories } from '../../config';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UsersService {
  #logger = new Logger(UsersService.name);
  constructor(
    @Inject(Repositories.User) private readonly repository: typeof UserEntity,
  ) {}

  findByEmail(email: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { email } });
  }
}
