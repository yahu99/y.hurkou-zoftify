import { LoginUserDto } from '../../../application/dtos/auth/login-user.dto';
import { LoginResponseDto } from '../../../application/dtos/auth/login-response.dto';

export interface IAuthService {
  login(dto: LoginUserDto): Promise<LoginResponseDto>;
}
