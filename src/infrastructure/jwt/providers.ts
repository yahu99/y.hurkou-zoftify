import { JwtService } from '../../domain/services/jwt.service';
import { JWT_SERVICE_TOKEN } from '../../shared/injection-tokens';

export const providers = [
  {
    provide: JWT_SERVICE_TOKEN,
    useClass: JwtService,
  },
];
