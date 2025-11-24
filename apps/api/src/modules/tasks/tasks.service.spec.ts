import { Test, TestingModule } from '@nestjs/testing';

import { db, tasks } from '@playground/db';
import { CreateTaskDto, PaginationDto, UpdateTaskDto } from '@playground/models';

import { TasksService } from './tasks.service';

jest.mock('@playground/db', () => ({
  db: {
    insert: jest.fn(),
    transaction: jest.fn(),
    query: {
      tasks: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
    update: jest.fn(),
    delete: jest.fn(),
    select: jest.fn(),
  },
  tasks: {
    id: 'id',
    workspaceId: 'workspaceId',
  },
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'mock-nanoid-id'),
}));

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task with generated id', async () => {
      const createTaskDto: CreateTaskDto = {
        workspaceId: 'workspace-1',
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        createdBy: 'user-1',
      };

      const mockTask = { id: 'mock-nanoid-id', ...createTaskDto };
      const mockReturning = jest.fn().mockResolvedValue([mockTask]);
      const mockValues = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.insert as jest.Mock).mockReturnValue({ values: mockValues });

      const result = await service.create(createTaskDto);

      expect(db.insert).toHaveBeenCalledWith(tasks);
      expect(mockValues).toHaveBeenCalledWith({
        id: 'mock-nanoid-id',
        workspaceId: createTaskDto.workspaceId,
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        createdBy: createTaskDto.createdBy,
      });
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return paginated tasks with total count', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const mockTasks = [{ id: 'task-1' }, { id: 'task-2' }];
      const mockCount = 2;

      const mockTransaction = jest.fn(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockResolvedValue([{ count: mockCount }]),
          }),
          query: {
            tasks: {
              findMany: jest.fn().mockResolvedValue(mockTasks),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAll(pagination);

      expect(db.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('data', mockTasks);
      expect(result).toHaveProperty('meta.totalCount', mockCount);
    });
  });

  describe('findOne', () => {
    it('should return a single task by id', async () => {
      const taskId = 'task-1';
      const mockTask = { id: taskId, title: 'Test Task' };

      (db.query.tasks.findFirst as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.findOne(taskId);

      expect(db.query.tasks.findFirst).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });

    it('should return undefined when task is not found', async () => {
      const taskId = 'non-existent-task';

      (db.query.tasks.findFirst as jest.Mock).mockResolvedValue(undefined);

      const result = await service.findOne(taskId);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update and return the updated task', async () => {
      const taskId = 'task-1';
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        status: 'in_progress',
      };
      const mockUpdatedTask = { id: taskId, ...updateTaskDto };

      const mockReturning = jest.fn().mockResolvedValue([mockUpdatedTask]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      const mockSet = jest.fn().mockReturnValue({ where: mockWhere });
      (db.update as jest.Mock).mockReturnValue({ set: mockSet });

      const result = await service.update(taskId, updateTaskDto);

      expect(db.update).toHaveBeenCalledWith(tasks);
      expect(mockSet).toHaveBeenCalledWith({
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
      });
      expect(result).toEqual(mockUpdatedTask);
    });

    it('should return null when task to update is not found', async () => {
      const taskId = 'non-existent-task';
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title' };

      const mockReturning = jest.fn().mockResolvedValue([]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      const mockSet = jest.fn().mockReturnValue({ where: mockWhere });
      (db.update as jest.Mock).mockReturnValue({ set: mockSet });

      const result = await service.update(taskId, updateTaskDto);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted task', async () => {
      const taskId = 'task-1';
      const mockDeletedTask = { id: taskId, title: 'Deleted Task' };

      const mockReturning = jest.fn().mockResolvedValue([mockDeletedTask]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.delete as jest.Mock).mockReturnValue({ where: mockWhere });

      const result = await service.delete(taskId);

      expect(db.delete).toHaveBeenCalledWith(tasks);
      expect(result).toEqual(mockDeletedTask);
    });

    it('should return null when task to delete is not found', async () => {
      const taskId = 'non-existent-task';

      const mockReturning = jest.fn().mockResolvedValue([]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.delete as jest.Mock).mockReturnValue({ where: mockWhere });

      const result = await service.delete(taskId);

      expect(result).toBeNull();
    });
  });

  describe('findAllByWorkspace', () => {
    it('should return paginated tasks for a specific workspace', async () => {
      const workspaceId = 'workspace-1';
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const mockTasks = [
        { id: 'task-1', workspaceId },
        { id: 'task-2', workspaceId },
      ];
      const mockCount = 2;

      const mockTransaction = jest.fn(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([{ count: mockCount }]),
            }),
          }),
          query: {
            tasks: {
              findMany: jest.fn().mockResolvedValue(mockTasks),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAllByWorkspace(workspaceId, pagination);

      expect(db.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('data', mockTasks);
      expect(result).toHaveProperty('meta.totalCount', mockCount);
    });

    it('should return empty result when workspace has no tasks', async () => {
      const workspaceId = 'empty-workspace';
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };

      const mockTransaction = jest.fn(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([{ count: 0 }]),
            }),
          }),
          query: {
            tasks: {
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAllByWorkspace(workspaceId, pagination);

      expect(result).toHaveProperty('data', []);
      expect(result).toHaveProperty('meta.totalCount', 0);
    });
  });
});
