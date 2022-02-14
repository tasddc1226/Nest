import { CatsRepository } from './cats.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { CatsService } from './services/cats.service';

@Module({
	// 스키마 등록
	imports: [
		MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
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
