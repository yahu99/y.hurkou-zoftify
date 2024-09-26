import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';
import { UserEntity } from '../../../domain/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({
    type: UserDto,
  })
  user: UserDto;

  @ApiProperty({})
  token: string;

  static construct(user: UserEntity, token: string): LoginResponseDto {
    const it = new LoginResponseDto();

    it.user = UserDto.construct(user);
    it.token = token;

    return it;
  }
}
