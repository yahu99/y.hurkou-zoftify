import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '../../application/controllers/auth.controller';
import { providers } from './providers';
import { JwtModule } from '../jwt/module';
import { UserModule } from '../users/module';

@Module({
  imports: [ConfigModule, JwtModule, UserModule],
  controllers: [AuthController],
  providers,
  exports: [...providers],
})
export class AuthModule {}
