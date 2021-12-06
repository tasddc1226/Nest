import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

declare const module: any;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    Logger.log(`Application running on port ${port}`)
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
