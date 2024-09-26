import { UserEntity } from '../../entities/user.entity';

export interface IJwtService {
  generateToken(user: UserEntity): string;
  getUserRoleFromToken(token: string): string;
  getUserIdFromToken(token: string): number;
}
