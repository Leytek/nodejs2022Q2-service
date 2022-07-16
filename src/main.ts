import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const docFile = await readFile('./doc/api.yaml', 'utf-8');
  const document = parse(docFile);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
