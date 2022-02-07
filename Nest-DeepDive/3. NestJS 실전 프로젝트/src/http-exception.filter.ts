import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		// getResponse라는 메서드로 에러 메시지를 가져올 수 있다.
		const error = exception.getResponse() as | string | { error: string; statusCode: number; message: string | string[] };
		// 이 error는 type이 string | object 이므로 string으로 넘어온다면 우리가 설정한 메시지를 가져오고, 아니라면 nest의 error 객체를 반환

		if (typeof error === 'string') {
			response.status(status).json({
				success: false,
				timestamp: new Date().toISOString(),
				path: request.url,
				error,
			});
		} else {
			// Nest 자체에서 발생된 에러
			response.status(status).json({
				success: false,
				timestamp: new Date().toISOString(),
				...error,
			});
		}
	}
}