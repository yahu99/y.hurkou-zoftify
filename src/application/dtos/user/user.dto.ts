import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRolesEnum } from '../../../domain/enums/roles.enum';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  role: UserRolesEnum;

  static construct(entity: UserEntity): UserDto {
    const it = new UserDto();

    it.id = entity.id;
    it.name = entity.name;
    it.login = entity.login;
    it.role = entity.role;

    return it;
  }
}
