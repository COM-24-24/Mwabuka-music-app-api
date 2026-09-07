import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/User Roles/roles.guard';
import * as dotenv from 'dotenv';

// Swagger imports
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const reflector = app.get(Reflector);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Audio Streaming API')
    .setDescription('API documentation for an audio-music streaming platform')
    .setVersion('1.0')
    .addBearerAuth() // JWT authentication support
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Swagger running at: http://localhost:${process.env.PORT ?? 3000}/api-docs`,
  );
}

bootstrap();
