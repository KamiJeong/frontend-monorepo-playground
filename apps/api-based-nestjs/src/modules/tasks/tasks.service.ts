import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db, tasks } from '@playground/db';
import {
  createPaginationResponse,
  CreateTaskDto,
  PaginationDto,
  UpdateTaskDto,
} from '@playground/models';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto) {
    const newTask = await db
      .insert(tasks)
      .values({
        id: nanoid(),
        workspaceId: createTaskDto.workspaceId,
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        createdBy: createTaskDto.createdBy,
      })
      .returning();

    return newTask[0];
  }

  async findAll(pagination: PaginationDto) {
    return await db.transaction(async (trx) => {
      const countResponse = await trx.select({ count: count() }).from(tasks);
      const list = await trx.query.tasks.findMany({
        with: { workspace: true, createdBy: true, comments: true },
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return createPaginationResponse(list, pagination, +countResponse[0].count);
    });
  }

  async findOne(id: string) {
    return await db.query.tasks.findFirst({
      with: { workspace: true, createdBy: true, comments: true },
      where: eq(tasks.id, id),
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await db
      .update(tasks)
      .set({
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
      })
      .where(eq(tasks.id, id))
      .returning();

    return updatedTask.length === 0 ? null : updatedTask[0];
  }

  async delete(id: string) {
    const deletedTask = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return deletedTask.length === 0 ? null : deletedTask[0];
  }

  async findAllByWorkspace(workspaceId: string, pagination: PaginationDto) {
    return await db.transaction(async (trx) => {
      const countResponse = await trx
        .select({ count: count() })
        .from(tasks)
        .where(eq(tasks.workspaceId, workspaceId));
      const list = await trx.query.tasks.findMany({
        with: { workspace: true, createdBy: true, comments: true },
        where: eq(tasks.workspaceId, workspaceId),
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return createPaginationResponse(list, pagination, +countResponse[0].count);
    });
  }
}
