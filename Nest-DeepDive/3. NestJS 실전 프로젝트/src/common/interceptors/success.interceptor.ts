import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // pre-controller

    // const now = Date.now();
    return next
      .handle()
      .pipe(
        // tap(() => console.log(`After... ${Date.now() - now}ms`)), // post-request
        map((data)=> ({
          success: true,
          data,
        })) // 여기서 data는 컨트롤러를 거친 후 응답(response)에 대한 data
      );
  }
}

// 공통된 기능을 수행하는 부분을 AOP 관점으로 모듈화를 시킨 것이다.
// 미들웨어와 인터셉터가 다른점은 실행 순서가 다르다는 점이다.
// 위의 인터셉터는 exception filter처럼 성공했을 때 데이터를 가공하는 인터셉터이다