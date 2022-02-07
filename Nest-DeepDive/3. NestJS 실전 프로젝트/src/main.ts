import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  app.useGlobalFilters(new HttpExceptionFilter()); // app에 대한 전역 filter 추가
  await app.listen(PORT);
}
bootstrap();
