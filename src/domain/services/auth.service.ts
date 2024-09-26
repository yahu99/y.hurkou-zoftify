import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  JWT_SERVICE_TOKEN,
  USER_SERVICE_TOKEN,
} from '../../shared/injection-tokens';
import { IAuthService } from '../interfaces/services/auth.interface';
import { aesDecrypt } from '../utils/aes';
import { ConfigService } from '@nestjs/config';
import { IJwtService } from '../interfaces/services/jwt.interface';
import { LoginResponseDto } from '../../application/dtos/auth/login-response.dto';
import { LoginUserDto } from '../../application/dtos/auth/login-user.dto';
import { IUserService } from '../interfaces/services/user.interface';

@Injectable()
export class AuthService implements IAuthService {
  private aesKey: string;
  constructor(
    private readonly configService: ConfigService,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService,
  ) {
    this.aesKey = this.configService.get<string>('AES_KEY');
  }

  async login(dto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.getUserEntityByLogin(dto.login, true);

    if (!user) throw new BadRequestException('Incorrect login or password');

    const decryptedUserPassword = aesDecrypt(user.password, this.aesKey);

    if (decryptedUserPassword !== dto.password)
      throw new BadRequestException('Incorrect login or password');

    return LoginResponseDto.construct(
      user,
      this.jwtService.generateToken(user),
    );
  }
}
