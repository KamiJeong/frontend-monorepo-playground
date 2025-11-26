import { and, asc, desc, eq, gt, ilike, lt } from 'drizzle-orm';

import { users } from '@playground/db';
import { PaginationDto, SortDto, UserFilterDto } from '@playground/models';

export class UsersQueryBuilder {
  #COLUMN_MAP = {
    id: users.id,
    name: users.name,
    email: users.email,
    created_at: users.createdAt,
  } as const;

  #query;
  #activeSort: { by: string; order: 'asc' | 'desc' }[] = [];

  constructor(baseQuery) {
    this.#query = baseQuery;
  }

  withFilter(filter?: UserFilterDto) {
    const conditions: any[] = [];

    if (!filter) return this;

    if (filter.id) {
      conditions.push(eq(users.id, filter.id));
    }

    if (filter.email) {
      conditions.push(ilike(users.email, `%${filter.email}%`));
    }

    if (filter.name) {
      conditions.push(ilike(users.name, `%${filter.name}%`));
    }

    if (conditions.length) {
      this.#query = this.#query.where(and(...conditions));
    }

    return this;
  }

  withSort(sort?: SortDto) {
    const pairs: { by: string; order: 'asc' | 'desc' }[] = [];
    const hasIdSort = sort?.sorts?.some((s) => s.by === 'id') || sort?.sortBy === 'id';

    if (sort?.sorts?.length) {
      pairs.push(...sort.sorts);
    } else if (sort?.sortBy) {
      pairs.push({ by: sort.sortBy, order: sort.order ?? 'asc' });
    }

    if (!hasIdSort) {
      pairs.push({ by: 'id', order: 'desc' });
    }
    this.#activeSort = pairs;

    const sortConditions = pairs
      .filter(({ by }) => !!this.#COLUMN_MAP[by])
      .map(({ by, order }) =>
        order === 'desc' ? desc(this.#COLUMN_MAP[by]) : asc(this.#COLUMN_MAP[by]),
      );

    this.#query = this.#query.orderBy(...sortConditions);

    return this;
  }

  // TODO - implement pagination logic
  withPagination(pagination: PaginationDto) {
    if (!pagination) return this;

    const { cursor, limit = 20 } = pagination;

    // Sort 설정이 없다면 기본 정렬 적용 (id desc)
    if (!this.#activeSort.length) {
      this.withSort({ sortBy: 'id', order: 'desc' });
    }

    // 🔥 첫 번째 sort만 cursor 기준으로 사용
    const primary = this.#activeSort[0];
    const column = this.#COLUMN_MAP[primary.by];

    if (cursor) {
      if (primary.order === 'asc') {
        this.#query = this.#query.where(gt(column, cursor));
      } else {
        this.#query = this.#query.where(lt(column, cursor));
      }
    }

    this.#query = this.#query.limit(limit);

    return this;
  }

  build() {
    return this.#query;
  }
}
