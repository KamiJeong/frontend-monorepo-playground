import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskDto, PaginationDto, UpdateTaskDto } from '@playground/models';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const mockTasksService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllByWorkspace: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  describe('create', () => {
    it('should create a task with all fields and return it', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Complete Task',
        description: 'Detailed description',
        status: 'todo',
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
      };
      const expectedTask = {
        id: 'task-1',
        title: 'Complete Task',
        description: 'Detailed description',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedTask);

      const result = await controller.create(createTaskDto);

      expect(service.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(expectedTask);
    });

    it('should create a task with empty description', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Task without description',
        description: '',
        status: 'todo',
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
      };
      const expectedTask = {
        id: 'task-2',
        title: 'Task without description',
        description: '',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedTask);

      const result = await controller.create(createTaskDto);

      expect(result.description).toBe('');
    });

    it('should create a task with in_progress status', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Active Task',
        status: 'in_progress',
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
      };
      const expectedTask = {
        id: 'task-3',
        title: 'Active Task',
        description: null,
        status: 'in_progress' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedTask);

      const result = await controller.create(createTaskDto);

      expect(result.status).toBe('in_progress');
    });

    it('should create a task with done status', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Finished Task',
        status: 'done',
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
      };
      const expectedTask = {
        id: 'task-4',
        title: 'Finished Task',
        description: null,
        status: 'done' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedTask);

      const result = await controller.create(createTaskDto);

      expect(result.status).toBe('done');
    });
  });

  describe('findAll', () => {
    it('should return tasks with different statuses', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: [
          {
            id: 'task-1',
            title: 'Todo Task',
            description: 'Description',
            status: 'todo' as const,
            workspaceId: 'workspace-1',
            createdBy: 'user-1',
            createdAt: new Date(),
            updatedAt: null,
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            comments: [],
            createdByUser: {
              id: 'user-1',
              name: 'Test User',
              email: 'abc@ghoho.com',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
          {
            id: 'task-2',
            title: 'In Progress Task',
            description: 'Description',
            status: 'in_progress' as const,
            workspaceId: 'workspace-1',
            createdBy: 'user-1',
            createdAt: new Date(),
            updatedAt: null,
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            comments: [],
            createdByUser: {
              id: 'user-1',
              name: 'Test User',
              email: 'abc@ghoho.com',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
          {
            id: 'task-3',
            title: 'Done Task',
            description: 'Description',
            status: 'done' as const,
            workspaceId: 'workspace-1',
            createdBy: 'user-1',
            createdAt: new Date(),
            updatedAt: new Date(),
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            comments: [],
            createdByUser: {
              id: 'user-1',
              name: 'Test User',
              email: 'abc@ghoho.com',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          totalCount: 3,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(result.data).toHaveLength(3);
      expect(result.data[0].status).toBe('todo');
      expect(result.data[1].status).toBe('in_progress');
      expect(result.data[2].status).toBe('done');
    });

    it('should return tasks on the last page', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 20, page: 3 };
      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `task-${i + 21}`,
          title: `Task ${i + 21}`,
          description: null,
          status: 'todo' as const,
          workspaceId: 'workspace-1',
          createdBy: 'user-1',
          createdAt: new Date(),
          updatedAt: null,
          workspace: {
            id: 'workspace-1',
            name: 'Test Workspace',
            createdBy: 'user-1',
            createdAt: new Date(),
          },
          comments: [],
          createdByUser: {
            id: 'user-1',
            name: 'Test User',
            email: 'abc@ghoho.com',
            avatarUrl: null,
            createdAt: new Date(),
          },
        })),
        meta: {
          page: 3,
          limit: 10,
          totalCount: 25,
          totalPages: 3,
          hasNext: false,
          hasPrevious: true,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(result.meta.hasNext).toBe(false);
      expect(result.meta.hasPrevious).toBe(true);
      expect(result.data).toHaveLength(5);
    });

    it('should return tasks with custom limit', async () => {
      const pagination: PaginationDto = { limit: 5, offset: 0, page: 1 };

      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `task-${i + 1}`,
          title: `Task ${i + 1}`,
          description: null,
          status: 'todo' as const,
          workspaceId: 'workspace-1',
          createdBy: 'user-1',
          createdAt: new Date(),
          updatedAt: null,
          workspace: {
            id: 'workspace-1',
            name: 'Test Workspace',
            createdBy: 'user-1',
            createdAt: new Date(),
          },
          comments: [],
          createdByUser: {
            id: 'user-1',
            name: 'Test User',
            email: 'abc@ghoho.com',
            avatarUrl: null,
            createdAt: new Date(),
          },
        })),
        meta: {
          page: 1,
          limit: 5,
          totalCount: 15,
          totalPages: 3,
          hasNext: true,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(result.data).toHaveLength(5);
      expect(result.meta.limit).toBe(5);
    });
  });

  describe('findOne', () => {
    it('should return a task with todo status', async () => {
      const taskId = 'task-1';
      const expectedTask = {
        id: taskId,
        title: 'Todo Task',
        description: 'Pending work',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        comments: [],
        createdByUser: {
          id: 'user-1',
          name: 'Test User',
          email: 'abc@ghoho.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedTask);

      const result = await controller.findOne(taskId);

      expect(result?.status).toBe('todo');
    });

    it('should return a task with empty string description', async () => {
      const taskId = 'task-3';
      const expectedTask = {
        id: taskId,
        title: 'Task',
        description: '',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        comments: [],
        createdByUser: {
          id: 'user-1',
          name: 'Test User',
          email: 'abc@ghoho.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedTask);

      const result = await controller.findOne(taskId);

      expect(result?.description).toBe('');
    });

    it('should handle finding task with special characters in id', async () => {
      const taskId = 'task-special_123-abc';
      const expectedTask = {
        id: taskId,
        title: 'Special ID Task',
        description: 'Test',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        comments: [],
        createdByUser: {
          id: 'user-1',
          name: 'Test User',
          email: 'abc@ghoho.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedTask);

      const result = await controller.findOne(taskId);

      expect(result?.id).toBe(taskId);
    });
  });

  describe('update', () => {
    it('should update only the description', async () => {
      const taskId = 'task-1';
      const updateTaskDto: UpdateTaskDto = {
        description: 'Updated description only',
      };
      const expectedTask = {
        id: taskId,
        title: 'Original Title',
        description: 'Updated description only',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedTask);

      const result = await controller.update(taskId, updateTaskDto);

      expect(result?.description).toBe('Updated description only');
    });

    it('should clear description when updated to empty string', async () => {
      const taskId = 'task-1';
      const updateTaskDto: UpdateTaskDto = {
        description: '',
      };
      const expectedTask = {
        id: taskId,
        title: 'Task',
        description: '',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedTask);

      const result = await controller.update(taskId, updateTaskDto);

      expect(result?.description).toBe('');
    });

    it('should update status from todo to in_progress', async () => {
      const taskId = 'task-1';
      const updateTaskDto: UpdateTaskDto = {
        status: 'in_progress',
      };
      const expectedTask = {
        id: taskId,
        title: 'Task',
        description: 'Description',
        status: 'in_progress' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedTask);

      const result = await controller.update(taskId, updateTaskDto);

      expect(result?.status).toBe('in_progress');
    });

    it('should update status from in_progress to done', async () => {
      const taskId = 'task-1';
      const updateTaskDto: UpdateTaskDto = {
        status: 'done',
      };
      const expectedTask = {
        id: taskId,
        title: 'Task',
        description: 'Description',
        status: 'done' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedTask);

      const result = await controller.update(taskId, updateTaskDto);

      expect(result?.status).toBe('done');
    });

    it('should update with empty DTO and return unchanged task', async () => {
      const taskId = 'task-1';
      const updateTaskDto: UpdateTaskDto = {};
      const expectedTask = {
        id: taskId,
        title: 'Task',
        description: 'Description',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedTask);

      const result = await controller.update(taskId, updateTaskDto);

      expect(result).toEqual(expectedTask);
    });
  });

  describe('delete', () => {
    it('should delete a task with null description', async () => {
      const taskId = 'task-1';
      const expectedTask = {
        id: taskId,
        title: 'Task',
        description: null,
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedTask);

      const result = await controller.delete(taskId);

      expect(result?.description).toBeNull();
    });

    it('should delete a task that has been updated', async () => {
      const taskId = 'task-1';
      const expectedTask = {
        id: taskId,
        title: 'Updated Task',
        description: 'Description',
        status: 'in_progress' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedTask);

      const result = await controller.delete(taskId);

      expect(result?.updatedAt).not.toBeNull();
    });

    it('should handle deletion with special characters in id', async () => {
      const taskId = 'task-special_456-xyz';
      const expectedTask = {
        id: taskId,
        title: 'Special Task',
        description: 'Description',
        status: 'todo' as const,
        workspaceId: 'workspace-1',
        createdBy: 'user-1',
        createdAt: new Date(),
        updatedAt: null,
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedTask);

      const result = await controller.delete(taskId);

      expect(result?.id).toBe(taskId);
    });
  });
});
