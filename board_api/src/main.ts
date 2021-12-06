import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const port = 3000;
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    Logger.log(`Application running on port ${port}`)
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
