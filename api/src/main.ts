import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter())
  
  app.enableCors({
    origin: process.env.CV_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.set('trust proxy', 1)
  
  const port = process.env.PORT ?? 4000;
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
