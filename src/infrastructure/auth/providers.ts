import { AUTH_SERVICE_TOKEN } from '../../shared/injection-tokens';
import { AuthService } from '../../domain/services/auth.service';

export const providers = [
  {
    provide: AUTH_SERVICE_TOKEN,
    useClass: AuthService,
  },
];
