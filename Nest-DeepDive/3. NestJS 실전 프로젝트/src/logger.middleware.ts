import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')
  use(req: Request, res: Response, next: NextFunction) {

    // finish라는 이벤트가 발생했을 때, response에 대한 결과값도 logging
    res.on('finish', () => {
      this.logger.log(`${req.ip} ${req.method} ${res.statusCode}`, req.originalUrl)

    })
    next();
  }
}
