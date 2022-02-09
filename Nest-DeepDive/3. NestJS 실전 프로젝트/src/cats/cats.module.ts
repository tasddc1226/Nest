import { CatsRepository } from './cats.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './cats.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	// 스키마 등록
	imports: [
		MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
		forwardRef(() => AuthModule),
	],
	controllers: [CatsController],
	providers: [CatsService, CatsRepository],
	exports: [CatsService, CatsRepository]
})
export class CatsModule { }
