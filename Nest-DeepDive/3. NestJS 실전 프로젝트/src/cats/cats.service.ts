import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CatsService {
	// 의존성 주입
	constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) { }

	async signUp(body: CatRequestDto) {
		const { email, name, password } = body;

		// email 중복 확인
		const isCatExist = await this.catModel.exists({ email });

		if (isCatExist) {
			throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다!');
			//throw new HttpException('해당하는 고양이는 이미 존재합니다!', 403);
		}

		// password 암호화
		const hashedPassword = await bcrypt.hash(password, 10);

		// DB save
		const cat = await this.catModel.create({ email, name, password: hashedPassword, });

		// 모든 필드를 return하는 것이 아니라 필요한 정보만 return
		return cat.readOnlyData;
	}
}
