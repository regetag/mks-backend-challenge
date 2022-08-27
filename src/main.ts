import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Swagger
  const swaggerConf = new DocumentBuilder()
    .setTitle('Movies API')
    .setDescription('The movies API built with NestJS')
    .setVersion('1.0')
    .setLicense(
      'MIT',
      'https://github.com/regetag/mks-backend-challenge/blob/main/LICENSE',
    )
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConf);

  SwaggerModule.setup('/', app, swaggerDoc);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: false,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(PORT);
}
bootstrap();
