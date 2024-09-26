import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY_TOKEN } from '../src/shared/injection-tokens';
import { UserService } from '../src/domain/services/user.service';
import { UserRepository } from '../src/domain/repositories/user.repository';
import { UserRolesEnum } from '../src/domain/enums/roles.enum';
import { ConfigModule } from '@nestjs/config';

const mockUserRepository = {
  getAllActiveUsers: jest.fn(),
  getById: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

const mockUsersEntity = [
  {
    id: 1,
    name: 'test name',
    role: UserRolesEnum.ADMIN,
    login: 'test1',
    password: 'password',
    isActive: true,
  },
  {
    id: 2,
    name: 'test name 2',
    role: UserRolesEnum.USER,
    login: 'test2',
    password: 'password',
    isActive: true,
  },
];

const mockUsersDto = [
  {
    id: 1,
    name: 'test name',
    role: UserRolesEnum.ADMIN,
    login: 'test1',
  },
  {
    id: 2,
    name: 'test name 2',
    role: UserRolesEnum.USER,
    login: 'test2',
  },
];

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(USER_REPOSITORY_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getAllActiveUsers', () => {
    it('should return an array of active users', async () => {
      userRepository.getAllActiveUsers = jest
        .fn()
        .mockResolvedValue(mockUsersEntity);

      const result = await userService.getAll();

      expect(result).toEqual(mockUsersDto);
    });
  });

  describe('findUserById', () => {
    it('should return a user by id', async () => {
      userRepository.getActualById = jest
        .fn()
        .mockResolvedValue(mockUsersEntity[0]);

      const result = await userService.getById(1);
      expect(result).toEqual(mockUsersDto[0]);
    });

    it('should throw an error if user is not found', async () => {
      userRepository.getActualById = jest.fn().mockResolvedValue(null);

      await expect(userService.getById(1)).rejects.toThrow('User not found!');
    });
  });
});
