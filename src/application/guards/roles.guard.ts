import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { JWT_SERVICE_TOKEN } from '../../shared/injection-tokens';
import { IJwtService } from '../../domain/interfaces/services/jwt.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get(Roles, context.getHandler());

    if (!allowedRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')?.[1];

    const userRole = this.jwtService.getUserRoleFromToken(token);

    return allowedRoles.includes(userRole);
  }
}
