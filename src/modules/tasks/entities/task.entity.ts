import { Model, Column, Table, DataType } from 'sequelize-typescript'; // Importa Model de sequelize-typescript
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
  @ApiProperty({
    example: 1,
    description: 'The id of the task',
  })
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ApiProperty({
    example: 'This is the task 1',
    description: 'The description of the task',
  })
  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: false,
    description: 'The status of the task',
    default: false,
  })
  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isCompleted: boolean;
}
