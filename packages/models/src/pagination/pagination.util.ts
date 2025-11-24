import { PaginationDto } from './pagination.dto';
import { PaginationMeta, PaginationResponse } from './pagination.type';
import { PaginationDefault } from '../enums/pagination-default.enum';

export const getPaginationOffset = (page: number, limit: number): number => {
  return ((page ?? PaginationDefault.PAGE) - 1) * (limit ?? PaginationDefault.LIMIT);
};

export const createPaginationMeta = (
  page: number,
  limit: number,
  totalCount: number,
): PaginationMeta => {
  const totalPages = Math.ceil(totalCount / limit);
  return {
    page,
    limit,
    totalCount,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};

export const createPaginationResponse = <T>(
  data: T[],
  pagination: PaginationDto,
  totalCount: number,
): PaginationResponse<T> => {
  return {
    data,
    meta: createPaginationMeta(pagination.page, pagination.limit, totalCount),
  };
};
