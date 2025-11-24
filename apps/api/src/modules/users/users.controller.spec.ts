import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto, PaginationDto, UpdateUserDto } from '@playground/models';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with all fields and return it', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      };
      const expectedUser = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expectedUser);
    });

    it('should create a user without avatar', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };
      const expectedUser = {
        id: 'user-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);

      expect(result.avatarUrl).toBeNull();
    });

    it('should create a user without name', async () => {
      const createUserDto: CreateUserDto = {
        name: undefined,
        email: 'anonymous@example.com',
        avatarUrl: undefined,
      };
      const expectedUser = {
        id: 'user-3',
        name: null,
        email: 'anonymous@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);

      expect(result.name).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: [
          {
            id: 'user-1',
            name: 'User 1',
            email: 'user1@example.com',
            avatarUrl: null,
            createdAt: new Date(),
          },
          {
            id: 'user-2',
            name: 'User 2',
            email: 'user2@example.com',
            avatarUrl: 'https://example.com/avatar2.jpg',
            createdAt: new Date(),
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

    it('should return empty list when no users exist', async () => {
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

    it('should return paginated users with hasNext true when more pages exist', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const expectedResult = {
        data: Array.from({ length: 10 }, (_, i) => ({
          id: `user-${i + 1}`,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          avatarUrl: null,
          createdAt: new Date(),
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

      const result = await controller.findAll(pagination);

      expect(result.meta.hasNext).toBe(true);
      expect(result.meta.totalPages).toBe(3);
    });

    it('should return paginated users with hasPrevious true when not on first page', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 10, page: 2 };
      const expectedResult = {
        data: Array.from({ length: 10 }, (_, i) => ({
          id: `user-${i + 11}`,
          name: `User ${i + 11}`,
          email: `user${i + 11}@example.com`,
          avatarUrl: null,
          createdAt: new Date(),
        })),
        meta: {
          page: 2,
          limit: 10,
          totalCount: 25,
          totalPages: 3,
          hasNext: true,
          hasPrevious: true,
        },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(pagination);

      expect(result.meta.hasPrevious).toBe(true);
      expect(result.meta.page).toBe(2);
    });

    it('should return users on the last page', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 20, page: 3 };
      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `user-${i + 21}`,
          name: `User ${i + 21}`,
          email: `user${i + 21}@example.com`,
          avatarUrl: null,
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

    it('should return users with custom limit', async () => {
      const pagination: PaginationDto = { limit: 5, offset: 0, page: 1 };
      const expectedResult = {
        data: Array.from({ length: 5 }, (_, i) => ({
          id: `user-${i + 1}`,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          avatarUrl: null,
          createdAt: new Date(),
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
    it('should return a single user by id', async () => {
      const userId = 'user-1';
      const expectedUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(service.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUser);
    });

    it('should return undefined when user does not exist', async () => {
      const userId = 'non-existent';

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      const result = await controller.findOne(userId);

      expect(result).toBeUndefined();
    });

    it('should return a user without name', async () => {
      const userId = 'user-2';
      const expectedUser = {
        id: userId,
        name: null,
        email: 'anonymous@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(result?.name).toBeNull();
    });

    it('should return a user without avatar', async () => {
      const userId = 'user-3';
      const expectedUser = {
        id: userId,
        name: 'User Without Avatar',
        email: 'user@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(result?.avatarUrl).toBeNull();
    });

    it('should handle finding user with special characters in id', async () => {
      const userId = 'user-special_123-abc';
      const expectedUser = {
        id: userId,
        name: 'Special User',
        email: 'special@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser);

      const result = await controller.findOne(userId);

      expect(result?.id).toBe(userId);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
        avatarUrl: 'https://example.com/avatar.jpg',
      };
      const expectedUser = {
        id: userId,
        name: 'Updated User',
        email: 'updated@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(result).toEqual(expectedUser);
    });

    it('should return null when user to update does not exist', async () => {
      const userId = 'non-existent';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };

      jest.spyOn(service, 'update').mockResolvedValue(null);

      const result = await controller.update(userId, updateUserDto);

      expect(result).toBeNull();
    });

    it('should update only the name', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name Only',
      };
      const expectedUser = {
        id: userId,
        name: 'Updated Name Only',
        email: 'original@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result?.name).toBe('Updated Name Only');
    });

    it('should update only the avatar', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        avatarUrl: 'https://example.com/new-avatar.jpg',
      };
      const expectedUser = {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        avatarUrl: 'https://example.com/new-avatar.jpg',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result?.avatarUrl).toBe('https://example.com/new-avatar.jpg');
    });

    it('should update multiple fields at once', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        name: 'New Name',
        avatarUrl: 'https://example.com/new-avatar.jpg',
      };
      const expectedUser = {
        id: userId,
        name: 'New Name',
        email: 'newemail@example.com',
        avatarUrl: 'https://example.com/new-avatar.jpg',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result?.name).toBe('New Name');
      expect(result?.email).toBe('newemail@example.com');
      expect(result?.avatarUrl).toBe('https://example.com/new-avatar.jpg');
    });

    it('should clear name when updated to null', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        name: undefined,
      };
      const expectedUser = {
        id: userId,
        name: null,
        email: 'user@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result?.name).toBeNull();
    });

    it('should clear avatar when updated to null', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        avatarUrl: undefined,
      };
      const expectedUser = {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result?.avatarUrl).toBeNull();
    });

    it('should update with empty DTO and return unchanged user', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {};
      const expectedUser = {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(result).toEqual(expectedUser);
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted user', async () => {
      const userId = 'user-1';
      const expectedUser = {
        id: userId,
        name: 'Deleted User',
        email: 'deleted@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedUser);

      const result = await controller.delete(userId);

      expect(service.delete).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUser);
    });

    it('should return null when user to delete does not exist', async () => {
      const userId = 'non-existent';

      jest.spyOn(service, 'delete').mockResolvedValue(null);

      const result = await controller.delete(userId);

      expect(result).toBeNull();
    });

    it('should delete a user with null name', async () => {
      const userId = 'user-1';
      const expectedUser = {
        id: userId,
        name: null,
        email: 'user@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedUser);

      const result = await controller.delete(userId);

      expect(result?.name).toBeNull();
    });

    it('should delete a user with null avatar', async () => {
      const userId = 'user-1';
      const expectedUser = {
        id: userId,
        name: 'User',
        email: 'user@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedUser);

      const result = await controller.delete(userId);

      expect(result?.avatarUrl).toBeNull();
    });

    it('should handle deletion with special characters in id', async () => {
      const userId = 'user-special_456-xyz';
      const expectedUser = {
        id: userId,
        name: 'Special User',
        email: 'special@example.com',
        avatarUrl: null,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(expectedUser);

      const result = await controller.delete(userId);

      expect(result?.id).toBe(userId);
    });
  });
});
