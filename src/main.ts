import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json({ limit: '60mb' }));

  app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentación API de cursos')
    .setDescription('Esta es un API para una plataforma de cursos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
