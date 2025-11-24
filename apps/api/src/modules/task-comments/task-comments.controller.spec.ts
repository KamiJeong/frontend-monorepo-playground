import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskCommentDto, PaginationDto, UpdateTaskCommentDto } from '@playground/models';

import { TaskCommentsController } from './task-comments.controller';
import { TaskCommentsService } from './task-comments.service';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

describe('TaskCommentsController', () => {
  let controller: TaskCommentsController;
  let service: TaskCommentsService;

  beforeEach(async () => {
    const mockTaskCommentsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCommentsController],
      providers: [
        {
          provide: TaskCommentsService,
          useValue: mockTaskCommentsService,
        },
      ],
    }).compile();

    controller = module.get<TaskCommentsController>(TaskCommentsController);
    service = module.get<TaskCommentsService>(TaskCommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task comment and return it', async () => {
      const createTaskCommentDto: CreateTaskCommentDto = {
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Test comment',
      };
      const expectedComment = {
        id: 'comment-1',
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Test comment',
        createdAt: new Date(),
        task: {
          id: 'task-1',
          title: 'Test Task',
          description: 'Test description',
          status: 'todo' as const,
          workspaceId: 'workspace-1',
          createdBy: 'user-1',
          createdAt: new Date(),
          updatedAt: null,
        },
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Test User',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedComment);

      const result = await controller.create(createTaskCommentDto);

      expect(service.create).toHaveBeenCalledWith(createTaskCommentDto);
      expect(result).toEqual(expectedComment);
    });
  });

  describe('findAll', () => {
    it('should return paginated task comments', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: [
          {
            id: 'comment-1',
            taskId: 'task-1',
            userId: 'user-1',
            content: 'Comment 1',
            createdAt: new Date(),
            task: {
              id: 'task-1',
              title: 'Test Task',
              description: 'Test description',
              status: 'todo' as const,
              workspaceId: 'workspace-1',
              createdBy: 'user-1',
              createdAt: new Date(),
              updatedAt: null,
            },
            user: {
              id: 'user-1',
              email: 'user1@example.com',
              name: 'User 1',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
          {
            id: 'comment-2',
            taskId: 'task-1',
            userId: 'user-2',
            content: 'Comment 2',
            createdAt: new Date(),
            task: {
              id: 'task-1',
              title: 'Test Task',
              description: 'Test description',
              status: 'todo' as const,
              workspaceId: 'workspace-1',
              createdBy: 'user-1',
              createdAt: new Date(),
              updatedAt: null,
            },
            user: {
              id: 'user-2',
              email: 'user2@example.com',
              name: 'User 2',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          totalCount: 2,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(service.findAll).toHaveBeenCalledWith(pagination);
      expect(result).toEqual(expectedResult);
    });

    it('should return empty list when no comments exist', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: [],
        meta: {
          page: 1,
          limit: 10,
          totalCount: 0,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single task comment by id', async () => {
      const commentId = 'comment-1';
      const expectedComment = {
        id: commentId,
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Test comment',
        createdAt: new Date(),
        task: {
          id: 'task-1',
          title: 'Test Task',
          description: 'Test description',
          status: 'todo' as const,
          workspaceId: 'workspace-1',
          createdBy: 'user-1',
          createdAt: new Date(),
          updatedAt: null,
        },
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Test User',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedComment);

      const result = await controller.findOne(commentId);

      expect(service.findOne).toHaveBeenCalledWith(commentId);
      expect(result).toEqual(expectedComment);
    });

    it('should return undefined when comment does not exist', async () => {
      const commentId = 'non-existent';

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      const result = await controller.findOne(commentId);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update and return the task comment', async () => {
      const commentId = 'comment-1';
      const updateTaskCommentDto: UpdateTaskCommentDto = {
        content: 'Updated content',
      };
      const expectedComment = {
        id: commentId,
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Updated content',
        createdAt: new Date(),
        task: {
          id: 'task-1',
          title: 'Test Task',
          description: 'Test description',
          status: 'todo' as const,
          workspaceId: 'workspace-1',
          createdBy: 'user-1',
          createdAt: new Date(),
          updatedAt: null,
        },
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Test User',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedComment);

      const result = await controller.update(commentId, updateTaskCommentDto);

      expect(service.update).toHaveBeenCalledWith(commentId, updateTaskCommentDto);
      expect(result).toEqual(expectedComment);
    });

    it('should return null when comment to update does not exist', async () => {
      const commentId = 'non-existent';
      const updateTaskCommentDto: UpdateTaskCommentDto = {
        content: 'Updated content',
      };

      jest.spyOn(service, 'update').mockResolvedValue(null);

      const result = await controller.update(commentId, updateTaskCommentDto);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted task comment', async () => {
      const commentId = 'comment-1';
      const expectedComment = {
        id: commentId,
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Deleted comment',
        createdAt: new Date(),
        task: {
          id: 'task-1',
          title: 'Test Task',
          description: 'Test description',
          status: 'todo' as const,
          workspaceId: 'workspace-1',
          createdBy: 'user-1',
          createdAt: new Date(),
          updatedAt: null,
        },
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Test User',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedComment);

      const result = await controller.delete(commentId);

      expect(service.delete).toHaveBeenCalledWith(commentId);
      expect(result).toEqual(expectedComment);
    });

    it('should return null when comment to delete does not exist', async () => {
      const commentId = 'non-existent';

      jest.spyOn(service, 'delete').mockResolvedValue(null);

      const result = await controller.delete(commentId);

      expect(result).toBeNull();
    });
  });
});
