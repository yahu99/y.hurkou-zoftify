import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')?.[1];

    if (!token) throw new UnauthorizedException(`Provide token please`);

    return token;
  },
);
