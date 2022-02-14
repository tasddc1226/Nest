import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import * as path from "path";
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // 제네릭 추가로 app에 대한 설정을 Express App이라고 명시
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // class validation 사용을 위한 등록
  app.useGlobalFilters(new HttpExceptionFilter()); // app에 대한 전역 filter 추가
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // Express App을 통해서 Static File들을 제공
  // http://localhost:8000/media/cats/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

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
