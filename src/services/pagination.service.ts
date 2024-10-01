import { Injectable } from '@nestjs/common';
import { PaginatedServicesDto } from 'src/modules/tasks/dto/pagination-query.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PaginationService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async paginate(
    page: number,
    limit: number,
    order: 'ASC' | 'DESC',
    apiBaseUrl: string,
    queryBuilderCallback?: (qb: SelectQueryBuilder<T>) => void,
  ): Promise<PaginatedServicesDto<T>> {
    try {
      const offset = (page - 1) * limit;

      const queryBuilder = this.repository.createQueryBuilder();

      if (queryBuilderCallback) {
        queryBuilderCallback(queryBuilder);
      }

      const [data, total] = await queryBuilder
        .orderBy('name', order) // Modifica 'name' según el campo que desees ordenar
        .skip(offset)
        .take(limit)
        .getManyAndCount();

      const nextPage =
        total > offset + limit
          ? `${apiBaseUrl}?page=${page + 1}&limit=${limit}`
          : null;
      const prevPage =
        offset > 0 ? `${apiBaseUrl}?page=${page - 1}&limit=${limit}` : null;

      return { data, total, prevPage, nextPage };
    } catch (error) {
      console.error(error.message);
      throw new Error('Error trying to paginate entities');
    }
  }
}
