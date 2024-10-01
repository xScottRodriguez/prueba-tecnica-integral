import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, Length } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ type: String, description: 'description of the task' })
  @Length(5, 255, {
    message: 'description must be between 5 and 255 characters',
  })
  readonly description: string;

  @ApiProperty({ type: Boolean, description: 'is the task completed?' })
  @IsBoolean({ message: 'isCompleted must be a boolean' })
  readonly isCompleted: boolean = false;
}
