import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRolesEnum } from '../../../domain/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/entities/user.entity';
import { aesEncrypt } from '../../../domain/utils/aes';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @ApiProperty({ type: 'enum', enum: UserRolesEnum, required: false })
  @IsOptional()
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;

  @ApiProperty()
  @IsNotEmpty({ message: 'login must not be empty' })
  login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string;

  static toEntity(dto: CreateUserDto, key: string): UserEntity {
    const it = new UserEntity();

    it.name = dto.name;
    it.role = dto.role;
    it.login = dto.login;
    it.password = aesEncrypt(dto.password, key);

    return it;
  }
}
