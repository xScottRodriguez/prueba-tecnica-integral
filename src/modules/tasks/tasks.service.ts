import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repositories } from 'src/config';
import pageBuilder from 'src/services/pagination.service';
import { IPagination, ISequelizeModel } from 'src/interfaces';
import { PaginationQueryDto } from './dto/pagination-query.dto';
// interface IPagination {
//   page: number;
//   limit: number;
//   order: OrderType;
//   apiBaseUrl?: string;
// }
@Injectable()
export class TasksService {
  #logger = new Logger(TasksService.name);
  private taskModelWrapper: ISequelizeModel<Task> = {
    findMany: (options) => this.taskRepository.findAll(options),
    count: (options) => this.taskRepository.count(options),
    // Otros métodos que necesites...
  };
  constructor(
    @Inject(Repositories.Task)
    private readonly taskRepository: typeof Task,
  ) {}
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    try {
      return await this.taskRepository.create({ ...createTaskDto, userId });
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error creating task');
    }
  }

  async findAll(
    pagination: PaginationQueryDto,
    userId: number,
  ): Promise<IPagination<Task>> {
    try {
      const { limit, order, page } = pagination;
      return pageBuilder<Task>(this.taskModelWrapper, {
        page,
        limit,
        where: {
          userId,
        },
        orderBy: order,
      });
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error finding tasks');
    }
  }

  async findOne(id: number, userId: number): Promise<Task> {
    try {
      return await this.taskRepository.findOne({
        where: { id, userId },
      });
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error finding task');
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<{
    message: string;
  }> {
    try {
      await this.taskRepository.update(updateTaskDto, {
        where: { id, userId },
      });
      return {
        message: 'Task updated successfully',
      };
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error updating task');
    }
  }

  async remove(
    id: number,
    userId: number,
  ): Promise<{
    message: string;
  }> {
    try {
      const existsTask = await this.taskRepository.findOne({
        where: { id, userId },
      });
      if (!existsTask) throw new NotFoundException('Task not found');

      await this.taskRepository.destroy({ where: { id } });
      return {
        message: 'Task deleted successfully',
      };
    } catch (error) {
      this.#logger.error(error);
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException('Error deleting task');
    }
  }
}
