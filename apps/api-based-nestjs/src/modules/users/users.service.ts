import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db, users } from '@playground/db';
import {
  createPaginationResponse,
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
} from '@playground/models';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const newUser = await db
      .insert(users)
      .values({
        id: nanoid(),
        email: createUserDto.email,
        name: createUserDto.name,
        avatarUrl: createUserDto.avatarUrl,
      })
      .returning();

    return newUser[0];
  }

  async findAll(pagination: PaginationDto) {
    return await db.transaction(async (trx) => {
      const countResponse = await trx.select({ count: count() }).from(users);
      const list = await trx.query.users.findMany({
        with: { workspaces: true },
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return createPaginationResponse(list, pagination, +countResponse[0].count);
    });
  }

  async findOne(id: string) {
    return await db.query.users.findFirst({
      // with: { workspaces: true },
      where: eq(users.id, id),
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await db
      .update(users)
      .set({
        name: updateUserDto.name,
        avatarUrl: updateUserDto.avatarUrl,
      })
      .where(eq(users.id, id))
      .returning();

    return updatedUser.length === 0 ? null : updatedUser[0];
  }

  async delete(id: string) {
    const deletedUser = await db.delete(users).where(eq(users.id, id)).returning();
    return deletedUser.length === 0 ? null : deletedUser[0];
  }
}
