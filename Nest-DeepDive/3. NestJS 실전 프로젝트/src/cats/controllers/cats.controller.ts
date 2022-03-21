import { Cat } from 'src/cats/cats.schema';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CatRequestDto } from '../dto/cats.request.dto';
import { Controller, Delete, Get, HttpException, Patch, Post, Put, UseFilters, Param, ParseIntPipe, Body, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { CatsService } from '../services/cats.service';
import { PositiveIntPipe } from 'src/common/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
	constructor(
		private readonly catsService: CatsService,
		private readonly authService: AuthService
	) { }

	@ApiOperation({ summary: '모든 고양이 가져오기' })
	@Get('all')
	getAllCat() {
		return this.catsService.getAllCat();
	}

	@ApiOperation({ summary: '현재 고양이 가져오기' })
	@UseGuards(JwtAuthGuard) // 컨트롤러에 도달하기 전 Guards를 거침
	@Get()
	getCurrentCat(@CurrentUser() cat: Cat) { // 커스텀 데코레이터 적용
		return cat.readOnlyData; //req.user;
	}

	@Get(':id')
	getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
		console.log('hello controller')
		return { cats:'get one cat api' };
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
	@UseInterceptors(FilesInterceptor('image', 10, multerOptions("cats")))
	@UseGuards(JwtAuthGuard)
	@Post('upload')
	uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
		// console.log(files);
		// return { image: `http://localhost:8000/media/cats/${files[0].filename}` };
		return this.catsService.uploadImg(cat, files); // 첫번째 인자 : 현재 login된 cat 정보 (jwt token)
	}

}
