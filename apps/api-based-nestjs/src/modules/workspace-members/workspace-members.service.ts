import { Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';

import { db, workspaceMembers } from '@playground/db';
import {
  createPaginationResponse,
  CreateWorkspaceMemberDto,
  PaginationDto,
} from '@playground/models';

@Injectable()
export class WorkspaceMembersService {
  async create(createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    const newWorkspaceMember = await db
      .insert(workspaceMembers)
      .values({
        workspaceId: createWorkspaceMemberDto.workspaceId,
        userId: createWorkspaceMemberDto.userId,
      })
      .returning();

    return newWorkspaceMember[0];
  }

  async findAll(workspaceId: string, pagination: PaginationDto) {
    return await db.transaction(async (trx) => {
      const countResponse = await trx
        .select({ count: count() })
        .from(workspaceMembers)
        .where(eq(workspaceMembers.workspaceId, workspaceId));
      const list = await trx.query.workspaceMembers.findMany({
        with: { workspace: true, user: true },
        where: eq(workspaceMembers.workspaceId, workspaceId),
        limit: pagination.limit,
        offset: pagination.offset,
      });
      return createPaginationResponse(list, pagination, +countResponse[0].count);
    });
  }

  async findOne(workspaceId: string, userId: string) {
    return await db.query.workspaceMembers.findFirst({
      with: { workspace: true, user: true },
      where: and(
        eq(workspaceMembers.workspaceId, workspaceId),
        eq(workspaceMembers.userId, userId),
      ),
    });
  }

  async delete(workspaceId: string, userId: string) {
    const deletedWorkspaceMember = await db
      .delete(workspaceMembers)
      .where(
        and(eq(workspaceMembers.workspaceId, workspaceId), eq(workspaceMembers.userId, userId)),
      )
      .returning();

    return deletedWorkspaceMember.length === 0 ? null : deletedWorkspaceMember[0];
  }
}
