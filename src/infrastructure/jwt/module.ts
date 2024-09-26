import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { providers } from './providers';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers,
  exports: [...providers, NestJwtModule],
})
export class JwtModule {}
