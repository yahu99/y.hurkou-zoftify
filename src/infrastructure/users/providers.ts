import { Provider } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import {
  USER_REPOSITORY_TOKEN,
  USER_SERVICE_TOKEN,
} from '../../shared/injection-tokens';
import { UserRepository } from '../../domain/repositories/user.repository';

export const userProviders: Provider[] = [
  {
    provide: USER_SERVICE_TOKEN,
    useClass: UserService,
  },
  {
    provide: USER_REPOSITORY_TOKEN,
    useClass: UserRepository,
  },
];
