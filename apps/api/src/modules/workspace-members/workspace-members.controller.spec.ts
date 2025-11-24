import { Test, TestingModule } from '@nestjs/testing';

import { CreateWorkspaceMemberDto, PaginationDto } from '@playground/models';

import { WorkspaceMembersController } from './workspace-members.controller';
import { WorkspaceMembersService } from './workspace-members.service';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

describe('WorkspaceMembersController', () => {
  let controller: WorkspaceMembersController;
  let service: WorkspaceMembersService;

  beforeEach(async () => {
    const mockWorkspaceMembersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceMembersController],
      providers: [
        {
          provide: WorkspaceMembersService,
          useValue: mockWorkspaceMembersService,
        },
      ],
    }).compile();

    controller = module.get<WorkspaceMembersController>(WorkspaceMembersController);
    service = module.get<WorkspaceMembersService>(WorkspaceMembersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a workspace member with owner role and return it', async () => {
      const createDto: CreateWorkspaceMemberDto = {
        workspaceId: 'workspace-1',
        userId: 'user-1',
      };
      const expectedMember = {
        userId: 'user-1',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedMember);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedMember);
    });

    it('should create a workspace member with admin role', async () => {
      const createDto: CreateWorkspaceMemberDto = {
        workspaceId: 'workspace-1',
        userId: 'user-2',
      };
      const expectedMember = {
        userId: 'user-2',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-2',
          name: 'Admin User',
          email: 'admin@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedMember);

      const result = await controller.create(createDto);

      expect(createDto.workspaceId).toBe(expectedMember.workspaceId);
      expect(createDto.userId).toBe(expectedMember.userId);
    });

    it('should create a workspace member with member role', async () => {
      const createDto: CreateWorkspaceMemberDto = {
        workspaceId: 'workspace-1',
        userId: 'user-3',
      };
      const expectedMember = {
        userId: 'user-3',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-3',
          name: 'Member User',
          email: 'member@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedMember);

      const result = await controller.create(createDto);

      expect(createDto.workspaceId).toBe(expectedMember.workspaceId);
      expect(createDto.userId).toBe(expectedMember.userId);
    });
  });

  describe('findAll', () => {
    it('should return paginated workspace members', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const workspaceId = 'workspace-1';
      const expectedResult = {
        data: [
          {
            userId: 'user-1',
            workspaceId: 'workspace-1',
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            user: {
              id: 'user-1',
              name: 'User 1',
              email: 'user1@example.com',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
        ],
        meta: {
          page: 1,
          limit: 10,
          totalCount: 1,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(workspaceId, pagination);

      expect(service.findAll).toHaveBeenCalledWith(workspaceId, pagination);
      expect(result).toEqual(expectedResult);
    });

    it('should return empty list when no workspace members exist', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const workspaceId = 'workspace-empty';
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

      const result = await controller.findAll(workspaceId, pagination);

      expect(result).toEqual(expectedResult);
    });

    it('should return members with different roles', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const workspaceId = 'workspace-1';
      const expectedResult = {
        data: [
          {
            userId: 'user-1',
            workspaceId: 'workspace-1',
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            user: {
              id: 'user-1',
              name: 'User 1',
              email: 'user1@example.com',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
          {
            userId: 'user-2',
            workspaceId: 'workspace-1',
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            user: {
              id: 'user-2',
              name: 'User 2',
              email: 'user2@example.com',
              avatarUrl: null,
              createdAt: new Date(),
            },
          },
          {
            userId: 'user-3',
            workspaceId: 'workspace-1',
            workspace: {
              id: 'workspace-1',
              name: 'Test Workspace',
              createdBy: 'user-1',
              createdAt: new Date(),
            },
            user: {
              id: 'user-3',
              name: 'User 3',
              email: 'user3@example.com',
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

      const result = await controller.findAll(workspaceId, pagination);

      expect(result.data[0].userId).toBe('user-1');
      expect(result.data[1].userId).toBe('user-2');
      expect(result.data[2].userId).toBe('user-3');
    });

    it('should return paginated members with hasNext true when more pages exist', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const workspaceId = 'workspace-1';
      const expectedResult = {
        data: Array.from({ length: 10 }, (_, i) => ({
          userId: `user-${i + 1}`,
          workspaceId: 'workspace-1',
          workspace: {
            id: 'workspace-1',
            name: 'Test Workspace',
            createdBy: 'user-1',
            createdAt: new Date(),
          },
          user: {
            id: `user-${i + 1}`,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            avatarUrl: null,
            createdAt: new Date(),
          },
        })),
        meta: {
          page: 1,
          limit: 10,
          totalCount: 25,
          totalPages: 3,
          hasNext: true,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(workspaceId, pagination);

      expect(result.meta.hasNext).toBe(true);
      expect(result.meta.totalPages).toBe(3);
    });

    it('should return members on the last page', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 20, page: 3 };
      const workspaceId = 'workspace-1';
      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          userId: `user-${i + 21}`,
          workspaceId: 'workspace-1',
          workspace: {
            id: 'workspace-1',
            name: 'Test Workspace',
            createdBy: 'user-1',
            createdAt: new Date(),
          },
          user: {
            id: `user-${i + 21}`,
            name: `User ${i + 21}`,
            email: `user${i + 21}@example.com`,
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

      const result = await controller.findAll(workspaceId, pagination);

      expect(result.meta.hasNext).toBe(false);
      expect(result.meta.hasPrevious).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a single workspace member by id', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'user-1';
      const expectedMember = {
        userId: 'user-1',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedMember);

      const result = await controller.findOne(workspaceId, memberId);

      expect(service.findOne).toHaveBeenCalledWith(workspaceId, memberId);
      expect(result).toEqual(expectedMember);
    });

    it('should return undefined when workspace member does not exist', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'non-existent';

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      const result = await controller.findOne(workspaceId, memberId);

      expect(result).toBeUndefined();
    });

    it('should return a member with admin role', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'user-2';
      const expectedMember = {
        userId: 'user-2',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-2',
          name: 'Admin User',
          email: 'admin@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedMember);

      const result = await controller.findOne(workspaceId, memberId);

      expect(result?.userId).toBe('user-2');
    });

    it('should return a member with member role', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'user-3';
      const expectedMember = {
        userId: 'user-3',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-3',
          name: 'Member User',
          email: 'member@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedMember);

      const result = await controller.findOne(workspaceId, memberId);

      expect(result?.userId).toBe('user-3');
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted workspace member', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'user-1';
      const expectedMember = {
        userId: 'user-1',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-1',
          name: 'Deleted User',
          email: 'deleted@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedMember);

      const result = await controller.delete(workspaceId, memberId);

      expect(service.delete).toHaveBeenCalledWith(workspaceId, memberId);
      expect(result).toEqual(expectedMember);
    });

    it('should return null when member to delete does not exist', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'non-existent';

      jest.spyOn(service, 'delete').mockResolvedValue(null);

      const result = await controller.delete(workspaceId, memberId);

      expect(result).toBeNull();
    });

    it('should delete a member with owner role', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'user-1';
      const expectedMember = {
        userId: 'user-1',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-1',
          name: 'Owner User',
          email: 'owner@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedMember);

      const result = await controller.delete(workspaceId, memberId);

      expect(result?.userId).toBe('user-1');
    });

    it('should delete a member with admin role', async () => {
      const workspaceId = 'workspace-1';
      const memberId = 'user-2';
      const expectedMember = {
        userId: 'user-2',
        workspaceId: 'workspace-1',
        workspace: {
          id: 'workspace-1',
          name: 'Test Workspace',
          createdBy: 'user-1',
          createdAt: new Date(),
        },
        user: {
          id: 'user-2',
          name: 'Admin User',
          email: 'admin@example.com',
          avatarUrl: null,
          createdAt: new Date(),
        },
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedMember);

      const result = await controller.delete(workspaceId, memberId);

      expect(result?.userId).toBe('user-2');
    });
  });
});
