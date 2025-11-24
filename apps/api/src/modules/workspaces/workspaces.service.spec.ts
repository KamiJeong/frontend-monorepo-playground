import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { db, workspaces } from '@playground/db';
import { CreateWorkspaceDto, PaginationDto } from '@playground/models';

import { WorkspacesService } from './workspaces.service';

jest.mock('@playground/db', () => ({
  db: {
    insert: jest.fn(),
    query: {
      workspaces: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
      },
    },
    select: jest.fn(),
    delete: jest.fn(),
    transaction: jest.fn(),
  },
  workspaces: {
    id: 'id',
    name: 'name',
    createdBy: 'createdBy',
    $inferSelect: {},
  },
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'test-id'),
}));

describe('WorkspacesService', () => {
  let service: WorkspacesService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacesService],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should create a new workspace with provided details', async () => {
      const createDto: CreateWorkspaceDto = {
        name: 'Test Workspace',
        createdBy: 'user-123',
      };
      const mockWorkspace = { id: 'test-id', name: 'Test Workspace', createdBy: 'user-123' };

      (db.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockWorkspace]),
        }),
      });

      const result = await service.create(createDto);

      expect(result).toEqual(mockWorkspace);
      expect(db.insert).toHaveBeenCalledWith(workspaces);
    });
  });

  describe('findAll', () => {
    it('should return paginated workspaces with members', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const mockWorkspaces = [
        { id: '1', name: 'Workspace 1', members: [] },
        { id: '2', name: 'Workspace 2', members: [] },
      ];
      const mockCount = 2;

      (db.transaction as jest.Mock).mockImplementation(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockResolvedValue([{ count: mockCount }]),
          }),
          query: {
            workspaces: {
              findMany: jest.fn().mockResolvedValue(mockWorkspaces),
            },
          },
        };
        return callback(trx);
      });

      const result = await service.findAll(pagination);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
    });

    it('should apply pagination limit and offset correctly', async () => {
      const pagination: PaginationDto = { limit: 5, offset: 10, page: 3 };

      (db.transaction as jest.Mock).mockImplementation(async (callback) => {
        const findMany = jest.fn().mockResolvedValue([]);
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockResolvedValue([{ count: 0 }]),
          }),
          query: {
            workspaces: { findMany },
          },
        };
        await callback(trx);
        expect(findMany).toHaveBeenCalledWith({
          with: { members: true },
          limit: 5,
          offset: 10,
        });
      });

      await service.findAll(pagination);
    });
  });

  describe('findOne', () => {
    it('should return a workspace with members when found', async () => {
      const mockWorkspace = { id: 'test-id', name: 'Test Workspace', members: [] };

      (db.query.workspaces.findFirst as jest.Mock).mockResolvedValue(mockWorkspace);

      const result = await service.findOne('test-id');

      expect(result).toEqual(mockWorkspace);
    });

    it('should throw NotFoundException when workspace is not found', async () => {
      (db.query.workspaces.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        'Workspace with id non-existent-id not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the workspace when it exists', async () => {
      const mockWorkspace = { id: 'test-id', name: 'Test Workspace', createdBy: 'user-123' };

      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockWorkspace]),
        }),
      });

      const result = await service.delete('test-id');

      expect(result).toEqual(mockWorkspace);
    });

    it('should return null when workspace does not exist', async () => {
      (db.delete as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([]),
        }),
      });

      const result = await service.delete('non-existent-id');

      expect(result).toBeNull();
    });
  });
});
