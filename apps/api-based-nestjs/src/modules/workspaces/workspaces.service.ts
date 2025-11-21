import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

import { db, workspaces } from '@playground/db';
import { createPaginationResponse, CreateWorkspaceDto, PaginationDto } from '@playground/models';

@Injectable()
export class WorkspacesService {
  async create(createWorkspaceDto: CreateWorkspaceDto) {
    const newWorkspace = await db
      .insert(workspaces)
      .values({
        id: nanoid(),
        name: createWorkspaceDto.name,
        createdBy: createWorkspaceDto.createdBy,
      })
      .returning();

    return newWorkspace[0];
  }

  async findAll(pagination: PaginationDto) {
    return await db.transaction(async (trx) => {
      const countResponse = await trx.select({ count: count() }).from(workspaces);
      const list = await trx
        .select()
        .from(workspaces)
        .limit(pagination.limit)
        .offset(pagination.offset);
      return createPaginationResponse(list, pagination, +countResponse[0].count);
    });
  }

  async findOne(id: string) {
    const foundWorkspace = await db.select().from(workspaces).where(eq(workspaces.id, id));
    return foundWorkspace.length === 0 ? null : foundWorkspace[0];
  }

  async delete(id: string) {
    const deletedWorkspace = await db.delete(workspaces).where(eq(workspaces.id, id)).returning();
    return deletedWorkspace.length === 0 ? null : deletedWorkspace[0];
  }
}
