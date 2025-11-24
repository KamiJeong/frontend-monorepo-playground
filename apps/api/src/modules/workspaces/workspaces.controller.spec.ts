import { Test, TestingModule } from '@nestjs/testing';

import { CreateWorkspaceDto, PaginationDto } from '@playground/models';

import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

describe('WorkspacesController', () => {
  let controller: WorkspacesController;
  let service: WorkspacesService;

  beforeEach(async () => {
    const mockWorkspacesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspacesController],
      providers: [
        {
          provide: WorkspacesService,
          useValue: mockWorkspacesService,
        },
      ],
    }).compile();

    controller = module.get<WorkspacesController>(WorkspacesController);
    service = module.get<WorkspacesService>(WorkspacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a workspace with all fields and return it', async () => {
      const createDto: CreateWorkspaceDto = {
        name: 'Test Workspace',
        createdBy: 'user-1',
      };
      const expectedWorkspace = {
        id: 'workspace-1',
        name: 'Test Workspace',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedWorkspace);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedWorkspace);
    });

    it('should create a workspace with empty name', async () => {
      const createDto: CreateWorkspaceDto = {
        name: '',
        createdBy: 'user-1',
      };
      const expectedWorkspace = {
        id: 'workspace-2',
        name: '',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedWorkspace);

      const result = await controller.create(createDto);

      expect(result.name).toBe('');
    });

    it('should create a workspace with special characters in name', async () => {
      const createDto: CreateWorkspaceDto = {
        name: 'Test-Workspace_123!@#',
        createdBy: 'user-1',
      };
      const expectedWorkspace = {
        id: 'workspace-3',
        name: 'Test-Workspace_123!@#',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedWorkspace);

      const result = await controller.create(createDto);

      expect(result.name).toBe('Test-Workspace_123!@#');
    });
  });

  describe('findAll', () => {
    it('should return paginated workspaces', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: [
          {
            id: 'workspace-1',
            name: 'Workspace 1',
            createdBy: 'user-1',
            createdAt: new Date(),
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

      const result = await controller.findAll(pagination);

      expect(service.findAll).toHaveBeenCalledWith(pagination);
      expect(result).toEqual(expectedResult);
    });

    it('should return empty list when no workspaces exist', async () => {
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

    it('should return paginated workspaces with hasNext true when more pages exist', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: Array.from({ length: 10 }, (_, i) => ({
          id: `workspace-${i + 1}`,
          name: `Workspace ${i + 1}`,
          createdBy: 'user-1',
          createdAt: new Date(),
        })),
        meta: {
          page: 1,
          limit: 10,
          totalCount: 30,
          totalPages: 3,
          hasNext: true,
          hasPrevious: false,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(result.meta.hasNext).toBe(true);
      expect(result.meta.totalPages).toBe(3);
    });

    it('should return workspaces on the last page', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 20, page: 3 };
      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `workspace-${i + 21}`,
          name: `Workspace ${i + 21}`,
          createdBy: 'user-1',
          createdAt: new Date(),
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

    it('should return workspaces with custom limit', async () => {
      const pagination: PaginationDto = { limit: 5, offset: 0, page: 1 };
      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `workspace-${i + 1}`,
          name: `Workspace ${i + 1}`,
          createdBy: 'user-1',
          createdAt: new Date(),
        })),
        meta: {
          page: 1,
          limit: 5,
          totalCount: 10,
          totalPages: 2,
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
    it('should return a single workspace by id', async () => {
      const workspaceId = 'workspace-1';
      const expectedWorkspace = {
        id: workspaceId,
        name: 'Test Workspace',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedWorkspace);

      const result = await controller.findOne(workspaceId);

      expect(service.findOne).toHaveBeenCalledWith(workspaceId);
      expect(result).toEqual(expectedWorkspace);
    });

    it('should return undefined when workspace does not exist', async () => {
      const workspaceId = 'non-existent';

      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const result = await controller.findOne(workspaceId);

      expect(result).toBeNull();
    });

    it('should return a workspace with empty name', async () => {
      const workspaceId = 'workspace-2';
      const expectedWorkspace = {
        id: workspaceId,
        name: '',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedWorkspace);

      const result = await controller.findOne(workspaceId);

      expect(result?.name).toBe('');
    });

    it('should handle finding workspace with special characters in id', async () => {
      const workspaceId = 'workspace-special_123-abc';
      const expectedWorkspace = {
        id: workspaceId,
        name: 'Special Workspace',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedWorkspace);

      const result = await controller.findOne(workspaceId);

      expect(result?.id).toBe(workspaceId);
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted workspace', async () => {
      const workspaceId = 'workspace-1';
      const expectedWorkspace = {
        id: workspaceId,
        name: 'Deleted Workspace',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedWorkspace);

      const result = await controller.delete(workspaceId);

      expect(service.delete).toHaveBeenCalledWith(workspaceId);
      expect(result).toEqual(expectedWorkspace);
    });

    it('should return null when workspace to delete does not exist', async () => {
      const workspaceId = 'non-existent';

      jest.spyOn(service, 'delete').mockResolvedValue(null);

      const result = await controller.delete(workspaceId);

      expect(result).toBeNull();
    });

    it('should delete a workspace with empty name', async () => {
      const workspaceId = 'workspace-1';
      const expectedWorkspace = {
        id: workspaceId,
        name: '',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedWorkspace);

      const result = await controller.delete(workspaceId);

      expect(result?.name).toBe('');
    });

    it('should handle deletion with special characters in id', async () => {
      const workspaceId = 'workspace-special_456-xyz';
      const expectedWorkspace = {
        id: workspaceId,
        name: 'Special Workspace',
        createdBy: 'user-1',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedWorkspace);

      const result = await controller.delete(workspaceId);

      expect(result?.id).toBe(workspaceId);
    });
  });
});
