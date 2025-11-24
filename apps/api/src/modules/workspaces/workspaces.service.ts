import { Injectable, NotFoundException } from '@nestjs/common';
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
      const list = await trx.query.workspaces.findMany({
        with: { members: true },
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return createPaginationResponse<typeof workspaces.$inferSelect>(
        list,
        pagination,
        +countResponse[0].count,
      );
    });
  }

  async findOne(id: string) {
    const selected = await db.query.workspaces.findFirst({
      with: { members: true },
      where: eq(workspaces.id, id),
    });

    if (selected === null) {
      throw new NotFoundException(`Workspace with id ${id} not found`);
    }

    return selected;
  }

  async delete(id: string) {
    const deletedWorkspace = await db.delete(workspaces).where(eq(workspaces.id, id)).returning();
    return deletedWorkspace.length === 0 ? null : deletedWorkspace[0];
  }
}
