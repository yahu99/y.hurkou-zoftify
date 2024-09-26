import { UserRolesEnum } from '../../domain/enums/roles.enum';

export type JwtPayloadType = {
  login: string;
  sub: number;
  role: UserRolesEnum;
};
