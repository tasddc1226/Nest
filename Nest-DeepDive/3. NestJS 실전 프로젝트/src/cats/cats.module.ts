import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
	controllers: [CatsController],
	providers: [CatsService],
	// 기본적으로는 캡슐화 되어있는 상태이다. 이를 외부(다른 모듈)에서 사용하려면 exports를 통해서 사용 가능하도록 한다.
	exports: [CatsService]
})
export class CatsModule { }
