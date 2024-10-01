import { Provider } from '@nestjs/common';
import { Repistories } from '../../config';

import { UserEntity } from './entities/user.entity';
export const userProvider: Provider[] = [
  {
    provide: Repistories.User,
    useValue: UserEntity,
  },
];
