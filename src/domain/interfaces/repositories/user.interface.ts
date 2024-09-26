import { UserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  getAllActiveUsers(): Promise<UserEntity[]>;
  getActualById(userId: number): Promise<UserEntity>;
  getByLogin(login: string, isActive?: boolean): Promise<UserEntity>;
  createUser(entity: UserEntity): Promise<UserEntity>;
  updateUser(entity: UserEntity): Promise<UserEntity>;
  deleteUser(userId: number): Promise<boolean>;
}
