import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiCreatedResponse({ type: CreateTaskDto })
  @ApiInternalServerErrorResponse({
    description: 'Error creating task',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOkResponse({ type: [CreateTaskDto] })
  @ApiInternalServerErrorResponse({
    description: 'Error finding tasks',
  })
  @Get()
  findAll(@Query() pagination: PaginationQueryDto): Promise<Task[]> {
    console.log(pagination);
    return this.tasksService.findAll();
  }

  @ApiOkResponse({ type: CreateTaskDto })
  @ApiInternalServerErrorResponse({
    description: 'Error finding task',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(+id);
  }

  @ApiBody({ type: CreateTaskDto })
  @ApiOkResponse({
    type: Task,
    description: 'Task updated successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error updating task',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<{ message: string }> {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOkResponse({ description: 'Task deleted successfully' })
  @ApiInternalServerErrorResponse({
    description: 'Error deleting task',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{
    message: string;
  }> {
    return this.tasksService.remove(+id);
  }
}
