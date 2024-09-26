import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AUTH_SERVICE_TOKEN } from '../../shared/injection-tokens';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { LoginResponseDto } from '../dtos/auth/login-response.dto';
import { IAuthService } from '../../domain/interfaces/services/auth.interface';
import { SWAGGER_AUTH } from '../../shared/swagger-auth';

@ApiTags('Auth')
@ApiBearerAuth(SWAGGER_AUTH)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() dto: LoginUserDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }
}
