import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './application/filters/errors.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_AUTH } from './shared/swagger-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('API')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        SWAGGER_AUTH,
      )
      .build(),
  );

  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
