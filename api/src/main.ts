import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.CV_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowheaders: ['Content-Type', 'Authorization'],
  });
  
  const port = process.env.PORT ?? 4000;
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
