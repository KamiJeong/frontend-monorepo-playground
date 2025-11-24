import { Test, TestingModule } from '@nestjs/testing';

import { db, users } from '@playground/db';
import { CreateUserDto, PaginationDto, UpdateUserDto } from '@playground/models';

import { UsersService } from './users.service';

jest.mock('@playground/db', () => ({
  db: {
    insert: jest.fn(),
    transaction: jest.fn(),
    query: {
      users: {
        findFirst: jest.fn(),
      },
    },
    update: jest.fn(),
    delete: jest.fn(),
  },
  users: {
    id: 'id',
    email: 'email',
  },
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'mock-nanoid-id'),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user with generated id', async () => {
      const createUserDto: CreateUserDto = {
        email: 'user@example.com',
        name: 'Test User',
        avatarUrl: 'https://example.com/avatar.jpg',
      };

      const mockUser = {
        id: 'mock-nanoid-id',
        email: 'user@example.com',
        name: 'Test User',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
        workspaces: [],
      };

      const mockReturning = jest.fn().mockResolvedValue([mockUser]);
      const mockValues = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.insert as jest.Mock).mockReturnValue({ values: mockValues });

      const result = await service.create(createUserDto);

      expect(db.insert).toHaveBeenCalledWith(users);
      expect(mockValues).toHaveBeenCalledWith({
        id: 'mock-nanoid-id',
        email: createUserDto.email,
        name: createUserDto.name,
        avatarUrl: createUserDto.avatarUrl,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return paginated users with workspaces', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };
      const mockUsers = [
        {
          id: 'user-1',
          email: 'user1@example.com',
          name: 'User 1',
          avatarUrl: null,
          createdAt: new Date(),
          workspaces: [],
        },
        {
          id: 'user-2',
          email: 'user2@example.com',
          name: 'User 2',
          avatarUrl: null,
          createdAt: new Date(),
          workspaces: [],
        },
      ];
      const mockCount = 2;

      const mockTransaction = jest.fn(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockResolvedValue([{ count: mockCount }]),
          }),
          query: {
            users: {
              findMany: jest.fn().mockResolvedValue(mockUsers),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAll(pagination);

      expect(db.transaction).toHaveBeenCalled();
      expect(result).toHaveProperty('data', mockUsers);
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('totalCount', mockCount);
    });

    it('should return empty list when no users exist', async () => {
      const pagination: PaginationDto = { limit: 10, offset: 0, page: 1 };

      const mockTransaction = jest.fn(async (callback) => {
        const trx = {
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockResolvedValue([{ count: 0 }]),
          }),
          query: {
            users: {
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        };
        return await callback(trx);
      });
      (db.transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await service.findAll(pagination);

      expect(result).toHaveProperty('data', []);
      expect(result.meta.totalCount).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const userId = 'user-1';
      const mockUser = {
        id: userId,
        email: 'user@example.com',
        name: 'Test User',
        avatarUrl: null,
        createdAt: new Date(),
      };

      (db.query.users.findFirst as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOne(userId);

      expect(db.query.users.findFirst).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should return undefined when user is not found', async () => {
      const userId = 'non-existent-user';

      (db.query.users.findFirst as jest.Mock).mockResolvedValue(undefined);

      const result = await service.findOne(userId);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      const userId = 'user-1';
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
        avatarUrl: 'https://example.com/new-avatar.jpg',
      };
      const mockUpdatedUser = {
        id: userId,
        email: 'user@example.com',
        name: 'Updated Name',
        avatarUrl: 'https://example.com/new-avatar.jpg',
        createdAt: new Date(),
      };

      const mockReturning = jest.fn().mockResolvedValue([mockUpdatedUser]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      const mockSet = jest.fn().mockReturnValue({ where: mockWhere });
      (db.update as jest.Mock).mockReturnValue({ set: mockSet });

      const result = await service.update(userId, updateUserDto);

      expect(db.update).toHaveBeenCalledWith(users);
      expect(mockSet).toHaveBeenCalledWith({
        name: updateUserDto.name,
        avatarUrl: updateUserDto.avatarUrl,
      });
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should return null when user to update is not found', async () => {
      const userId = 'non-existent-user';
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };

      const mockReturning = jest.fn().mockResolvedValue([]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      const mockSet = jest.fn().mockReturnValue({ where: mockWhere });
      (db.update as jest.Mock).mockReturnValue({ set: mockSet });

      const result = await service.update(userId, updateUserDto);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted user', async () => {
      const userId = 'user-1';
      const mockDeletedUser = {
        id: userId,
        email: 'user@example.com',
        name: 'Deleted User',
        avatarUrl: null,
        createdAt: new Date(),
      };

      const mockReturning = jest.fn().mockResolvedValue([mockDeletedUser]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.delete as jest.Mock).mockReturnValue({ where: mockWhere });

      const result = await service.delete(userId);

      expect(db.delete).toHaveBeenCalledWith(users);
      expect(result).toEqual(mockDeletedUser);
    });

    it('should return null when user to delete is not found', async () => {
      const userId = 'non-existent-user';

      const mockReturning = jest.fn().mockResolvedValue([]);
      const mockWhere = jest.fn().mockReturnValue({ returning: mockReturning });
      (db.delete as jest.Mock).mockReturnValue({ where: mockWhere });

      const result = await service.delete(userId);

      expect(result).toBeNull();
    });
  });
});
