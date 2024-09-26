import { userProviders } from './providers';
import { Module } from '@nestjs/common';
import { UserController } from '../../application/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { JwtModule } from '../jwt/module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule],
  controllers: [UserController],
  providers: [...userProviders],
  exports: userProviders,
})
export class UserModule {}
