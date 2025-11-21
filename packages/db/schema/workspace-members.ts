import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { users } from './users';
import { workspaces } from './workspaces';

export const workspaceMembers = pgTable('workspace_members', {
  userId: text('user_id').references(() => users.id),
  workspaceId: text('workspace_id').references(() => workspaces.id),
});

export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [workspaceMembers.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [workspaceMembers.userId],
    references: [users.id],
  }),
}));
