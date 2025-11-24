import { Test, TestingModule } from '@nestjs/testing';
import { nanoid } from 'nanoid';

import { db } from '@playground/db';
import { CreateTaskCommentDto, PaginationDto, UpdateTaskCommentDto } from '@playground/models';

import { TaskCommentsService } from './task-comments.service';

// Mock the database module
jest.mock('@playground/db', () => ({
  db: {
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
      taskComments: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
    },
    transaction: jest.fn(),
    select: jest.fn(),
  },
  taskComments: {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId',
    content: 'content',
  },
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

describe('TaskCommentsService', () => {
  let service: TaskCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCommentsService],
    }).compile();

    service = module.get<TaskCommentsService>(TaskCommentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task comment', async () => {
      const createDto: CreateTaskCommentDto = {
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Test comment',
      };

      const mockId = 'generated-id';
      const mockResult = { id: mockId, ...createDto };

      (nanoid as jest.Mock).mockReturnValue(mockId);
      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockResult]),
        }),
      });

      const result = await service.create(createDto);

      expect(result).toEqual(mockResult);
      expect(db.insert).toHaveBeenCalled();
      expect(nanoid).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return paginated task comments', async () => {
      const pagination: PaginationDto = {
        page: 1,
        limit: 10,
        offset: 0,
      };
      const mockComments = [
        { id: '1', taskId: 'task-1', userId: 'user-1', content: 'Comment 1' },
        { id: '2', taskId: 'task-2', userId: 'user-2', content: 'Comment 2' },
      ];
      const mockCount = 2;

      (db.transaction as jest.Mock).mockImplementation(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockResolvedValue([{ count: mockCount }]),
          }),
          query: {
            taskComments: {
              findMany: jest.fn().mockResolvedValue(mockComments),
            },
          },
        };
        return callback(trx);
      });

      const result = await service.findAll(pagination);

      expect(result.data).toEqual(mockComments);
      expect(result.meta.totalCount).toBe(mockCount);
      expect(db.transaction).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task comment', async () => {
      const mockComment = {
        id: '1',
        taskId: 'task-1',
        userId: 'user-1',
        content: 'Test comment',
      };

      (db.query.taskComments.findFirst as jest.Mock).mockResolvedValue(mockComment);

      const result = await service.findOne('1');

      expect(result).toEqual(mockComment);
      expect(db.query.taskComments.findFirst).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a task comment', async () => {
      const updateDto: UpdateTaskCommentDto = {
        content: 'Updated content',
      };
      const mockUpdated = { id: '1', content: 'Updated content' };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockUpdated]),
          }),
        }),
      });

      const result = await service.update('1', updateDto);

      expect(result).toEqual(mockUpdated);
      expect(db.update).toHaveBeenCalled();
    });

    it('should return null if comment not found', async () => {
      const updateDto: UpdateTaskCommentDto = {
        content: 'Updated content',
      };

      (db.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      const result = await service.update('non-existent', updateDto);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a task comment', async () => {
      const mockDeleted = { id: '1', content: 'Deleted comment' };

      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockDeleted]),
        }),
      });

      const result = await service.delete('1');

      expect(result).toEqual(mockDeleted);
      expect(db.delete).toHaveBeenCalled();
    });

    it('should return null if comment not found', async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([]),
        }),
      });

      const result = await service.delete('non-existent');

      expect(result).toBeNull();
    });
  });
});
