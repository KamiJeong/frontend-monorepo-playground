import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { tasks } from './tasks';
import { users } from './users';
import { workspaceMembers } from './workspace-members';

export const workspaces = pgTable('workspaces', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),

  createdBy: text('created_by')
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  members: many(workspaceMembers),
  tasks: many(tasks),
  user: one(users, {
    fields: [workspaces.createdBy],
    references: [users.id],
  }),
}));
