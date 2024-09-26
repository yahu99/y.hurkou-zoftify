import { UserDto } from '../../../application/dtos/user/user.dto';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto } from '../../../application/dtos/user/create-user.dto';
import { UpdateUserDto } from '../../../application/dtos/user/update-user.dto';

export interface IUserService {
  getAll(): Promise<UserDto[]>;
  getById(userId: number): Promise<UserDto>;
  getUserEntityByLogin(login: string, isActive?: boolean): Promise<UserEntity>;
  createUser(dto: CreateUserDto): Promise<UserDto>;
  updateUser(dto: UpdateUserDto): Promise<UserDto>;
  deleteUser(userId: number): Promise<boolean>;
}
