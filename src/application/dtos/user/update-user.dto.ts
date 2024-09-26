import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserRolesEnum } from '../../../domain/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/entities/user.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @ApiProperty({ type: 'enum', enum: UserRolesEnum, required: false })
  @IsOptional()
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;

  static toEntity(dto: UpdateUserDto, entityToUpdate: UserEntity): UserEntity {
    entityToUpdate.name = dto.name || entityToUpdate.name;
    entityToUpdate.role = dto.role || entityToUpdate.role;

    return entityToUpdate;
  }
}
