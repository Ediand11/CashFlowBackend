import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser'; // Import cookie-parser without default import
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.URL_LOCAL,
    credentials: true,
  });
  await app.listen(3010);
}
bootstrap();
