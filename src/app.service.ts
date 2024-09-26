import { Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE_TOKEN } from './shared/injection-tokens';
import { IUserService } from './domain/interfaces/services/user.interface';
import { UserRolesEnum } from './domain/enums/roles.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
  ) {}

  async onApplicationBootstrap(): Promise<boolean> {
    const [login, password] = [
      this.configService.get<string>('ADMIN_LOGIN') || 'Admin',
      this.configService.get<string>('ADMIN_PASS') || 'Pass',
    ];

    const admin = await this.userService.getUserEntityByLogin(login);

    if (admin) return true;

    await this.userService.createUser({
      name: 'Admin',
      role: UserRolesEnum.ADMIN,
      login: login,
      password: password,
    });

    console.log('Admin user was created');
    return true;
  }
}
