import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { GetUser } from 'src/decorators';
import { UserEntity } from '../users/entities/user.entity';
import { ResponseHandler } from 'src/common/response.handler';
import { ResponseDto } from 'src/common';
import { IPagination } from 'src/interfaces';

interface IpaginationResponse extends IPagination<Task> {
  statusCode: number;
  message: string;
}
@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly responseHandler: ResponseHandler,
  ) {}

  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({ type: ResponseDto<Task> })
  @ApiInternalServerErrorResponse({
    description: 'Error creating task',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<ResponseDto<Task>> {
    const data: Task = await this.tasksService.create(createTaskDto, user.id);
    return this.responseHandler.success(
      HttpStatus.CREATED,
      data,
      'Task created',
    );
  }

  @ApiOkResponse({ type: ResponseDto<Task[]> })
  @ApiInternalServerErrorResponse({
    description: 'Error finding tasks',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() pagination: PaginationQueryDto,
    @GetUser() user: UserEntity,
  ): Promise<IpaginationResponse> {
    const data: IPagination<Task> = await this.tasksService.findAll(
      pagination,
      user.id,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Tasks retrieved',
      ...data,
    };
  }

  @ApiOkResponse({ type: ResponseDto<Task> })
  @ApiInternalServerErrorResponse({
    description: 'Error finding task',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<ResponseDto<Task>> {
    const data: Task = await this.tasksService.findOne(+id, user.id);
    return this.responseHandler.success(HttpStatus.OK, data, 'Task retrieved');
  }

  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({
    type: ResponseDto<null>,
    description: 'Task updated successfully',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error updating task',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<ResponseDto<null>> {
    await this.tasksService.update(+id, updateTaskDto, user.id);
    return this.responseHandler.success(
      HttpStatus.OK,
      null,
      'Task updated successfully',
    );
  }

  @ApiOkResponse({
    description: 'Task deleted successfully',
    type: ResponseDto<null>,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error deleting task',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<ResponseDto<null>> {
    await this.tasksService.remove(+id, user.id);
    return this.responseHandler.success(
      HttpStatus.OK,
      null,
      'Task deleted successfully',
    );
  }
}
