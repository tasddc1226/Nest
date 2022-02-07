import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Patch, Post, Put, UseFilters, Param, ParseIntPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter) // 컨트롤러 전체에 filter를 적용하는 방법
export class CatsController {
	constructor(private readonly catsService: CatsService) {

	}

	@Get()
	// @UseFilters(HttpExceptionFilter) // 특정 컨트롤러에 filter를 적용하는 방법
	getAllCat() {
		// 원하는 형식으로 예외처리를 오버라이딩 가능
		// throw new HttpException({ success: false, message: 'api is broken' }, 401)
		// 하지만 이 방식을 계속해서 붙여넣는 방식보다는 Filter를 사용하는 아래의 방식으로
		throw new HttpException('api broken', 401);
	}

	@Get(':id')
	getOneCat(@Param('id', ParseIntPipe) param: number) {
		console.log(typeof (param)); // Param으로 받아온 인자는 string type 이다.
		// 이 string으로 오는 type을 number로 사용하는 경우가 많다. -> ParseIntPipe를 사용해서 type 변환 가능
		// 만약 위의 변환된 값이 숫자가 아니라 문자라면 Validation error를 발생시켜준다
		return 'one cat';
	}

	@Post()
	createCat() {
		return 'create cat';
	}

	@Put(':id')
	updateCat() {
		return 'update cat';
	}

	@Patch(':id')
	updatePartialCat() {
		return '  update';
	}

	@Delete(':id')
	deleteCat() {
		return 'delete service';
	}

}
