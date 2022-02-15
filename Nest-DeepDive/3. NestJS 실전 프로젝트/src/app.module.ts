import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as mongoose from "mongoose"

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI, {
  }), CatsModule, AuthModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService], // 공급자를 등록하는 부분
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    // 모든 endpoints에 대하여 logger 미들웨어를 실행한다.
    consumer.apply(LoggerMiddleware).forRoutes('*');

    mongoose.set('debug', this.isDev); // query를 log로 찍어주기 위함 (dev mode)

  }
}
