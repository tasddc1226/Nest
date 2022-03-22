import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    // return { message: 'Hello! Suguri!' };
    return {
      data: {
        title: '나랑 함께해 Duo',
        copyright: 'suguri',
      },
    };
  }
}
