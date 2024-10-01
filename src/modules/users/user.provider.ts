import { Provider } from '@nestjs/common';
import { Repositories } from '../../config';

import { UserEntity } from './entities/user.entity';
export const UserProvider: Provider[] = [
  {
    provide: Repositories.User,
    useValue: UserEntity,
  },
];
