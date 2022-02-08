import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation 사용을 위한 등록
  app.useGlobalFilters(new HttpExceptionFilter()); // app에 대한 전역 filter 추가

  const config = new DocumentBuilder()
    .setTitle('Cats Community')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  // swagger API의 endpoint를 지정 => localhost:8000/docs
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: true, // dev MODE이면 true, 배포 시 특정 URL
    credentials: true
  });

  const PORT = process.env.PORT
  await app.listen(PORT);
}
bootstrap();
