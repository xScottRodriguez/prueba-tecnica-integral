import { Provider } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Repistories } from 'src/config';
export const taskProvider: Provider[] = [
  {
    provide: Repistories.Task,
    useValue: Task,
  },
];
