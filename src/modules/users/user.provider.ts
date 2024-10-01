import { Provider } from '@nestjs/common';
import { Repositories } from '../../config';

import { UserEntity } from './entities/user.entity';
export const userProvider: Provider[] = [
  {
    provide: Repositories.User,
    useValue: UserEntity,
  },
];
