import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { IJwtService } from '../interfaces/services/jwt.interface';
import { UserEntity } from '../entities/user.entity';
import { JwtPayloadType } from '../../shared/types/jwt-payload.type';
import { UserRolesEnum } from '../enums/roles.enum';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  private verifyToken(token: string): JwtPayloadType {
    try {
      return this.nestJwtService.verify(token);
    } catch {
      throw new HttpException('Bad token!', HttpStatus.UNAUTHORIZED);
    }
  }

  generateToken(user: UserEntity): string {
    const payload: JwtPayloadType = {
      role: user.role as UserRolesEnum,
      login: user.login,
      sub: user.id,
    };

    return this.nestJwtService.sign(payload, { expiresIn: '180s' });
  }

  getUserRoleFromToken(token: string): UserRolesEnum {
    const user = this.verifyToken(token);

    return user?.role;
  }

  getUserIdFromToken(token: string): number {
    const user = this.verifyToken(token);

    return user.sub;
  }
}
