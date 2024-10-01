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
// interface IPagination {
//   page: number;
//   limit: number;
//   order: OrderType;
//   apiBaseUrl?: string;
// }
@Injectable()
export class TasksService {
  #logger = new Logger(TasksService.name);
  constructor(
    @Inject(Repositories.Task)
    private readonly taskRepository: typeof Task,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.create({ ...createTaskDto });
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error creating task');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.findAll();
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error finding tasks');
    }
  }
  // async paginate({
  //   limit,
  //   order,
  //   page,
  //   apiBaseUrl = this.configService.get<string>('API_BASE_URL'),
  // }: IPagination): Promise<PaginatedServicesDto<Task>> {
  //   try {
  //     const offset = (page - 1) * limit;

  //     const [data, total] = await this.taskRepository
  //       .createQueryBuilder('tasks')
  //       .orderBy('tasks.description', order)
  //       .skip(offset)
  //       .take(limit)
  //       .getManyAndCount();

  //     const nextPage =
  //       total > offset + limit
  //         ? `${apiBaseUrl}/tasks?page=${page + 1}&limit=${limit}`
  //         : null;
  //     const prevPage =
  //       offset > 0
  //         ? `${apiBaseUrl}/tasks?page=${page - 1}&limit=${limit}`
  //         : null;
  //     return { data, total, prevPage, nextPage };
  //   } catch (error) {
  //     this.#logger.error(error.message);
  //     throw new InternalServerErrorException('Error trying search services');
  //   }
  // }

  async findOne(id: number): Promise<Task> {
    try {
      return await this.taskRepository.findOne({
        where: { id },
      });
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error finding task');
    }
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<{
    message: string;
  }> {
    try {
      await this.taskRepository.update(updateTaskDto, { where: { id } });
      return {
        message: 'Task updated successfully',
      };
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException('Error updating task');
    }
  }

  async remove(id: number): Promise<{
    message: string;
  }> {
    try {
      const existsTask = await this.findOne(id);
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
