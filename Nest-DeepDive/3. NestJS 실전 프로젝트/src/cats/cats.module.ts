import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from './cats.schema';

@Module({
	// 스키마 등록
	imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
	controllers: [CatsController],
	providers: [CatsService],
	exports: [CatsService]
})
export class CatsModule { }
