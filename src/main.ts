import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사용 pipe를 만들어준다.
  // express.js 에서는 미들웨어 처럼..
  app.useGlobalPipes(
    new ValidationPipe({
      // pipe의 속성을 추가 -> 보안 upgrade 아래의 forbidNonWhitelisted 옵션을 사용하기 위해 필요함.
      whitelist: true,
      // 원치 않는 입력이 온다면 해당 리퀘스트 자체를 막아버림.
      forbidNonWhitelisted: true,
      // 사용자의 입력을 개발자가 원하는 실제 타입으로 변환해주는 기능
      transform: true
    })
  );
  await app.listen(3000);
}
bootstrap();
