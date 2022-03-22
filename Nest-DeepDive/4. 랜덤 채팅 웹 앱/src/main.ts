import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // javascript, css 파일을 서빙
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // nest에서 서빙할 템플릿 엔진을 어느 경로에 둘 것인지 세팅
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // hbs view 엔진 사용 세팅 (pug같은 뷰 엔진??)
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
