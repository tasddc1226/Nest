import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // 의존성 주입 패턴
  // AppController : 공급자
  // appService : 제품
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    // 제품을 사용한다
    return this.appService.getHello();
  }
}
