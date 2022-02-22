import { MongooseModule } from '@nestjs/mongoose';
import { CatsRepository } from './cats.repository';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { CatsService } from './services/cats.service';
import { Comments, CommentsSchema } from '../comments/comments.schema';

@Module({
	// 스키마 등록
	imports: [
		MongooseModule.forFeature([
			{ name: Comments.name, schema: CommentsSchema }, // Cat 안에서 Comments를 사용하기 위함
			{ name: Cat.name, schema: CatSchema },
		]),
		forwardRef(() => AuthModule),
		MulterModule.register({
			dest: './upload', // upload라는 폴더에 저장
		}),
	],
	controllers: [CatsController],
	providers: [CatsService, CatsRepository],
	exports: [CatsService, CatsRepository]
})
export class CatsModule { }
