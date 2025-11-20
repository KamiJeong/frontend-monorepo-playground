import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './user';

export const workspace = pgTable('workspace', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),

  createdBy: text('created_by')
    .references(() => user.id)
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});

export const workspaceMember = pgTable('workspace_member', {
  userId: text('user_id').references(() => user.id),
  workspaceId: text('workspace_id').references(() => workspace.id),
});
