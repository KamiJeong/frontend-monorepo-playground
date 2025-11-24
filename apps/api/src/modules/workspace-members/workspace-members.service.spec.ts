import { Test, TestingModule } from '@nestjs/testing';

import { db, workspaceMembers } from '@playground/db';
import { CreateWorkspaceMemberDto, PaginationDto } from '@playground/models';

import { WorkspaceMembersService } from './workspace-members.service';

jest.mock('@playground/db', () => ({
  db: {
    insert: jest.fn(),
    transaction: jest.fn(),
    query: {
      workspaceMembers: {
        findFirst: jest.fn(),
      },
    },
    delete: jest.fn(),
  },
  workspaceMembers: {
    workspaceId: 'workspaceId',
    userId: 'userId',
  },
}));

describe('WorkspaceMembersService', () => {
  let service: WorkspaceMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceMembersService],
    }).compile();

    service = module.get<WorkspaceMembersService>(WorkspaceMembersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a workspace member and return it', async () => {
      const createWorkspaceMemberDto: CreateWorkspaceMemberDto = {
        workspaceId: 'workspace-1',
        userId: 'user-1',
      };
      const expectedMember = {
        workspaceId: 'workspace-1',
        userId: 'user-1',
        addedAt: new Date(),
      };

      const mockReturning = jest.fn().mockResolvedValue([expectedMember]);
      const mockValues = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.insert as jest.Mock).mockReturnValue({ values: mockValues });

      const result = await service.create(createWorkspaceMemberDto);

      expect(db.insert).toHaveBeenCalledWith(workspaceMembers);
      expect(mockValues).toHaveBeenCalledWith({
        workspaceId: createWorkspaceMemberDto.workspaceId,
        userId: createWorkspaceMemberDto.userId,
      });
      expect(result).toEqual(expectedMember);
    });
  });

  describe('findAll', () => {
    it('should return paginated workspace members', async () => {
      const workspaceId = 'workspace-1';
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const mockMembers = [
        {
          workspaceId: 'workspace-1',
          userId: 'user-1',
          addedAt: new Date(),
          workspace: {
            id: 'workspace-1',
            name: 'Test Workspace',
            createdBy: 'user-1',
            createdAt: new Date(),
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
          workspaceId: 'workspace-1',
          userId: 'user-2',
          addedAt: new Date(),
          workspace: {
            id: 'workspace-1',
            name: 'Test Workspace',
            createdBy: 'user-1',
            createdAt: new Date(),
          },
          user: {
            id: 'user-2',
            email: 'user2@example.com',
            name: 'User 2',
            avatarUrl: null,
            createdAt: new Date(),
          },
        },
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
            workspaceMembers: {
              findMany: jest.fn().mockResolvedValue(mockMembers),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAll(workspaceId, pagination);

      expect(db.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('data', mockMembers);
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('totalCount', mockCount);
    });

    it('should return empty list when workspace has no members', async () => {
      const workspaceId = 'workspace-empty';
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };

      const mockTransaction = jest.fn(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([{ count: 0 }]),
            }),
          }),
          query: {
            workspaceMembers: {
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAll(workspaceId, pagination);

      expect(result).toHaveProperty('data', []);
      expect(result.meta.totalCount).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return a single workspace member by workspace and user id', async () => {
      const workspaceId = 'workspace-1';
      const userId = 'user-1';
      const expectedMember = {
        workspaceId: 'workspace-1',
        userId: 'user-1',
        addedAt: new Date(),
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Test User',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      (db.query.workspaceMembers.findFirst as jest.Mock).mockResolvedValue(expectedMember);

      const result = await service.findOne(workspaceId, userId);

      expect(db.query.workspaceMembers.findFirst).toHaveBeenCalled();
      expect(result).toEqual(expectedMember);
    });

    it('should return undefined when workspace member is not found', async () => {
      const workspaceId = 'non-existent-workspace';
      const userId = 'non-existent-user';

      (db.query.workspaceMembers.findFirst as jest.Mock).mockResolvedValue(undefined);

      const result = await service.findOne(workspaceId, userId);

      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted workspace member', async () => {
      const workspaceId = 'workspace-1';
      const userId = 'user-1';
      const expectedMember = {
        workspaceId: 'workspace-1',
        userId: 'user-1',
        addedAt: new Date(),
      };

      const mockReturning = jest.fn().mockResolvedValue([expectedMember]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.delete as jest.Mock).mockReturnValue({ where: mockWhere });

      const result = await service.delete(workspaceId, userId);

      expect(db.delete).toHaveBeenCalledWith(workspaceMembers);
      expect(result).toEqual(expectedMember);
    });

    it('should return null when workspace member to delete is not found', async () => {
      const workspaceId = 'non-existent-workspace';
      const userId = 'non-existent-user';

      const mockReturning = jest.fn().mockResolvedValue([]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.delete as jest.Mock).mockReturnValue({ where: mockWhere });

      const result = await service.delete(workspaceId, userId);

      expect(result).toBeNull();
    });
  });
});
