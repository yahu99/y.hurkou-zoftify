import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './infrastructure/users/module';
import { RequestLogMiddleware } from './application/middlewares/request-log.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './infrastructure/jwt/module';
import { AuthModule } from './infrastructure/auth/module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...AppDataSource.options,
      }),
    }),
    UserModule,
    JwtModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLogMiddleware).forRoutes('*');
  }
}
