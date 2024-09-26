import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/repositories/user.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  getAllActiveUsers(): Promise<UserEntity[]> {
    return this.find({
      where: { isActive: true },
    });
  }

  getActualById(id: number): Promise<UserEntity> {
    return this.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  getByLogin(login: string): Promise<UserEntity> {
    return this.findOne({
      where: {
        login,
      },
    });
  }

  createUser(entity: UserEntity): Promise<UserEntity> {
    return this.save(entity);
  }

  updateUser(entity: UserEntity): Promise<UserEntity> {
    return this.save(entity);
  }
  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.update(
      {
        id: userId,
      },
      {
        isActive: false,
      },
    );

    return !!result.affected;
  }
}
