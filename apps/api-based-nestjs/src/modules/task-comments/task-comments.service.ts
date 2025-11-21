import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db, taskComments } from '@playground/db';
import {
  createPaginationResponse,
  CreateTaskCommentDto,
  PaginationDto,
  UpdateTaskCommentDto,
} from '@playground/models';

@Injectable()
export class TaskCommentsService {
  async create(createTaskCommentDto: CreateTaskCommentDto) {
    const newTaskComment = await db
      .insert(taskComments)
      .values({
        id: nanoid(),
        taskId: createTaskCommentDto.taskId,
        userId: createTaskCommentDto.userId,
        content: createTaskCommentDto.content,
      })
      .returning();

    return newTaskComment[0];
  }

  async findAll(pagination: PaginationDto) {
    return await db.transaction(async (trx) => {
      const countResponse = await trx.select({ count: count() }).from(taskComments);
      const list = await trx.query.taskComments.findMany({
        with: { user: true, task: true },
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return createPaginationResponse(list, pagination, +countResponse[0].count);
    });
  }

  async findOne(id: string) {
    return await db.query.taskComments.findFirst({
      with: { user: true, task: true },
      where: eq(taskComments.id, id),
    });
  }

  async update(id: string, updateTaskCommentDto: UpdateTaskCommentDto) {
    const updatedTaskComment = await db
      .update(taskComments)
      .set({
        content: updateTaskCommentDto.content,
      })
      .where(eq(taskComments.id, id))
      .returning();

    return updatedTaskComment.length === 0 ? null : updatedTaskComment[0];
  }

  async delete(id: string) {
    const deletedTaskComment = await db
      .delete(taskComments)
      .where(eq(taskComments.id, id))
      .returning();
    return deletedTaskComment.length === 0 ? null : deletedTaskComment[0];
  }
}
