import { Provider } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TASK_REPOSITORY } from '../../config';
export const TaskProvider: Provider[] = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
