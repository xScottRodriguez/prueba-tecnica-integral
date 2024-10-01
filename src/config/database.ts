import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Task } from '../modules/tasks/entities/task.entity';
import { SEQUELIZE } from './constants';
import { envs } from './envs';
import { UserEntity } from '../modules/users/entities/user.entity';
export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: envs.dbHost,
        port: envs.dbPort,
        username: envs.dbUser,
        password: envs.dbPassword,
        database: envs.dbName,
      });
      sequelize.addModels([Task, UserEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
