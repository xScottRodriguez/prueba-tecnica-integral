import { Exclude, plainToClass } from 'class-transformer';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from 'src/modules/tasks/entities/task.entity';

@Table({
  tableName: 'users',
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  @Exclude()
  password: string;

  @HasMany(() => Task)
  tasks: Task[];

  toJSON() {
    return plainToClass(UserEntity, this).dataValues;
  }
}
