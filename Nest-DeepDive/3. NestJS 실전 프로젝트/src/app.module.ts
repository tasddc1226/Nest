import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService], // 공급자를 등록하는 부분
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 모든 endpoints에 대하여 logger 미들웨어를 실행한다.
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
