import { Cat } from 'src/cats/cats.schema';
import { Request } from 'express';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Patch, Post, Put, UseFilters, Param, ParseIntPipe, Body, UseGuards, Req } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
	constructor(
		private readonly catsService: CatsService,
		private readonly authService: AuthService
	) { }

	@ApiOperation({ summary: '현재 고양이 가져오기' })
	@UseGuards(JwtAuthGuard) // 컨트롤러에 도달하기 전 Guards를 거침
	@Get()
	getCurrentCat(@CurrentUser() cat: Cat) { // 커스텀 데코레이터 적용
		return cat.readOnlyData; //req.user;
	}

	@ApiResponse({
		status: 500,
		description: 'Server Error...',
	})
	@ApiResponse({
		status: 200,
		description: '성공!',
		type: ReadOnlyCatDto
	})
	@ApiOperation({ summary: '회원가입' })
	@Post()
	async signUp(@Body() body: CatRequestDto) {
		return await this.catsService.signUp(body);
	}

	@ApiOperation({ summary: '로그인' })
	@Post('login')
	logIn(@Body() data: LoginRequestDto) {
		return this.authService.jwtLogIn(data);
	}

	@ApiOperation({ summary: '고양이 이미지 업로드' })
	@Post('upload/cats')
	uploadCatImg() {
		return 'uploadImg';
	}

}
