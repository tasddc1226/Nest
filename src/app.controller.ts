import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // NestJs의 Get 데코레이터로 함수 or 클래스와 붙어있어야 함.
  @Get() // express의 get 라우터와 같은 역할 -> 라우터 세팅이 필요없다.
  getHello(): string {
    return this.appService.getHello();
  }

  // ex) /hello 라는 요청이 들어오면 hello ! 문자열을 리턴
  @Get('/hello')
  sayHello(): string {
    return 'hello !';
  }

  // 하지만 위의 두 Get 요청에는 차이점이 존재한다.
  // 1번째에서는 appService의 함수를 불러오고 2번째에서는 그냥 문자열만 리턴을 해준다.
  // 그냥 리턴을 해줘도 문제가 없어보이는데.. 굳이 사용하는 이유가? --> 구조와 아키텍처의 이해 필요
  // Nest는 controller와 Logic을 구분 짓고 싶어함.
  // controller : url 가져오기 & exe func.
  // service : some Logics
}
