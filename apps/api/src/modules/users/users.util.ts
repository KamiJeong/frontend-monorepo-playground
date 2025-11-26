import { and, asc, desc, eq, ilike, SQL } from 'drizzle-orm';

import { users } from '@playground/db';
import { SortDto, UserFilterDto } from '@playground/models';

class UsersUtil {
  #filter: SQL<unknown>[] | undefined;

  constructor() {}
}

// build Filter conditions from UserFilterDto
export const buildUserFilter = (filter?: UserFilterDto) => {
  const conditions: any[] = [];

  if (!filter) return undefined;

  if (filter.id) {
    conditions.push(eq(users.id, filter.id));
  }

  if (filter.email) {
    conditions.push(ilike(users.email, `%${filter.email}%`));
  }

  if (filter.name) {
    conditions.push(ilike(users.name, `%${filter.name}%`));
  }

  return conditions.length ? and(...conditions) : undefined;
};

const COLUMN_MAP = {
  id: users.id,
  name: users.name,
  email: users.email,
  created_at: users.createdAt,
};

// build Sort conditions from SortDto
export const buildUserSort = (sort?: SortDto) => {
  const pairs: { by: string; order: 'asc' | 'desc' }[] = [];

  if (sort?.sorts?.length) {
    pairs.push(...sort.sorts);
  } else if (sort?.sortBy) {
    pairs.push({ by: sort.sortBy, order: sort.order ?? 'asc' });
  }

  // tie-breaker 추가
  // pairs.push({ by: 'id', order: 'desc' });

  return pairs
    .filter(({ by }) => !!COLUMN_MAP[by])
    .map(({ by, order }) => {
      if (order === 'desc') return desc(COLUMN_MAP[by]);
      return asc(COLUMN_MAP[by]);
    });
};

// encode cursor by sorting columns
export const encodeUserCursor = (sortValues: (string | Date)[]) => {
  const str = sortValues.map((v) => (v instanceof Date ? v.toISOString() : v.toString())).join('|');
  return Buffer.from(str).toString('base64');
};

// decode cursor by sorting columns and change date string to Date object by column type
export const decodeUserCursor = (cursor: string, sort: readonly (readonly [any, any])[]) => {
  const str = Buffer.from(cursor, 'base64').toString('ascii');
  const values = str.split('|');

  return values.map((v, i) => {
    const column = sort[i][0];
    if (column === users.createdAt) {
      return new Date(v);
    }
    return v;
  });
};

export const getUsersByCUrsor = async (trx) => {};
