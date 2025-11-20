import 'dotenv/config';
import { nanoid } from 'nanoid';

import { task, taskComment, user, workspace, workspaceMember } from './schema';

import { db } from './index';

/**
 * this is for testing and development purposes only
 * it will drop all existing data and create new sample data
 */
const seed = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Clearing existing data...');
    await db.delete(taskComment);
    await db.delete(task);
    await db.delete(workspaceMember);
    await db.delete(workspace);
    await db.delete(user);
    console.log('✅ Existing data cleared');

    // Create users
    console.log('👤 Creating users...');
    const users = [
      {
        id: nanoid(),
        email: 'alice@example.com',
        name: 'Alice Johnson',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      },
      {
        id: nanoid(),
        email: 'bob@example.com',
        name: 'Bob Smith',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      },
      {
        id: nanoid(),
        email: 'charlie@example.com',
        name: 'Charlie Brown',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      },
      {
        id: nanoid(),
        email: 'diana@example.com',
        name: 'Diana Prince',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
      },
    ];

    await db.insert(user).values(users);
    console.log(`✅ Created ${users.length} users`);

    // Create workspaces
    console.log('🏢 Creating workspaces...');
    const workspaces = [
      {
        id: nanoid(),
        name: 'Frontend Team',
        createdBy: users[0].id,
      },
      {
        id: nanoid(),
        name: 'Backend Team',
        createdBy: users[1].id,
      },
      {
        id: nanoid(),
        name: 'Design Team',
        createdBy: users[2].id,
      },
    ];

    await db.insert(workspace).values(workspaces);
    console.log(`✅ Created ${workspaces.length} workspaces`);

    // Create workspace members
    console.log('👥 Creating workspace members...');
    const members = [
      // Frontend Team members
      { userId: users[0].id, workspaceId: workspaces[0].id },
      { userId: users[1].id, workspaceId: workspaces[0].id },
      { userId: users[3].id, workspaceId: workspaces[0].id },
      // Backend Team members
      { userId: users[1].id, workspaceId: workspaces[1].id },
      { userId: users[2].id, workspaceId: workspaces[1].id },
      // Design Team members
      { userId: users[2].id, workspaceId: workspaces[2].id },
      { userId: users[3].id, workspaceId: workspaces[2].id },
    ];

    await db.insert(workspaceMember).values(members);
    console.log(`✅ Created ${members.length} workspace members`);

    // Create tasks
    console.log('📝 Creating tasks...');
    const tasks = [
      // Frontend Team tasks
      {
        id: nanoid(),
        workspaceId: workspaces[0].id,
        title: 'Setup React project with Vite',
        description: 'Initialize a new React project using Vite and configure TypeScript',
        status: 'done' as const,
        createdBy: users[0].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[0].id,
        title: 'Implement authentication UI',
        description: 'Create login and signup forms with validation',
        status: 'in_progress' as const,
        createdBy: users[0].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[0].id,
        title: 'Design component library',
        description: 'Build reusable UI components with Storybook',
        status: 'todo' as const,
        createdBy: users[1].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[0].id,
        title: 'Add dark mode support',
        description: 'Implement theme switching functionality',
        status: 'todo' as const,
        createdBy: users[3].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[0].id,
        title: 'Optimize bundle size',
        description: 'Analyze and reduce bundle size using code splitting',
        status: 'todo' as const,
        createdBy: users[1].id,
      },
      // Backend Team tasks
      {
        id: nanoid(),
        workspaceId: workspaces[1].id,
        title: 'Setup PostgreSQL database',
        description: 'Configure database with Drizzle ORM',
        status: 'done' as const,
        createdBy: users[1].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[1].id,
        title: 'Implement REST API endpoints',
        description: 'Create CRUD endpoints for users and tasks',
        status: 'in_progress' as const,
        createdBy: users[2].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[1].id,
        title: 'Add API authentication',
        description: 'Implement JWT-based authentication',
        status: 'in_progress' as const,
        createdBy: users[1].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[1].id,
        title: 'Write API documentation',
        description: 'Document all API endpoints with OpenAPI/Swagger',
        status: 'todo' as const,
        createdBy: users[2].id,
      },
      // Design Team tasks
      {
        id: nanoid(),
        workspaceId: workspaces[2].id,
        title: 'Create design system',
        description: 'Define colors, typography, and spacing guidelines',
        status: 'done' as const,
        createdBy: users[2].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[2].id,
        title: 'Design user dashboard',
        description: 'Create mockups for the main user dashboard',
        status: 'in_progress' as const,
        createdBy: users[3].id,
      },
      {
        id: nanoid(),
        workspaceId: workspaces[2].id,
        title: 'Design mobile responsive layouts',
        description: 'Ensure all designs work well on mobile devices',
        status: 'todo' as const,
        createdBy: users[2].id,
      },
    ];

    await db.insert(task).values(tasks);
    console.log(`✅ Created ${tasks.length} tasks`);

    // Create task comments
    console.log('💬 Creating task comments...');
    const comments = [
      {
        id: nanoid(),
        taskId: tasks[1].id,
        userId: users[1].id,
        content: 'I can help with the form validation logic!',
      },
      {
        id: nanoid(),
        taskId: tasks[1].id,
        userId: users[0].id,
        content: 'Thanks! Let me know if you need any design assets.',
      },
      {
        id: nanoid(),
        taskId: tasks[6].id,
        userId: users[1].id,
        content: 'User endpoints are complete. Working on tasks endpoints now.',
      },
      {
        id: nanoid(),
        taskId: tasks[7].id,
        userId: users[2].id,
        content: 'Should we use refresh tokens as well?',
      },
      {
        id: nanoid(),
        taskId: tasks[7].id,
        userId: users[1].id,
        content: "Yes, let's implement refresh tokens for better security.",
      },
      {
        id: nanoid(),
        taskId: tasks[10].id,
        userId: users[2].id,
        content: 'First draft is ready for review!',
      },
    ];

    await db.insert(taskComment).values(comments);
    console.log(`✅ Created ${comments.length} task comments`);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seed();
