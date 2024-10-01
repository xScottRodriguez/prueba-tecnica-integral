import { Provider } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repositories } from 'src/config';
export const taskProvider: Provider[] = [
  {
    provide: Repositories.Task,
    useValue: Task,
  },
];
