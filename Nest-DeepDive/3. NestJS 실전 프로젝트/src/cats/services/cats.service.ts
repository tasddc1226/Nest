import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { Cat } from '../cats.schema';
import { CatRequestDto } from '../dto/cats.request.dto';
import { CatsRepository } from '../cats.repository';

@Injectable()
export class CatsService {
	// Repository 의존성 주입
	constructor(private readonly catsRepository: CatsRepository) { }

	async signUp(body: CatRequestDto) {
		const { email, name, password } = body;

		// email 중복 확인
		const isCatExist = await this.catsRepository.existsByEmail(email);

		if (isCatExist) {
			throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다!');
			//throw new HttpException('해당하는 고양이는 이미 존재합니다!', 403);
		}

		// password 암호화
		const hashedPassword = await bcrypt.hash(password, 10);

		// DB save
		const cat = await this.catsRepository.create({ email, name, password: hashedPassword, });

		// 모든 필드를 return하는 것이 아니라 필요한 정보만 return
		return cat.readOnlyData;

	}

	async uploadImg(cat: Cat, files: Express.Multer.File[]) {
		const fileName = `cats/${files[0].filename}`;

		console.log(fileName);

		const newCat = await this.catsRepository.findByIdAndUpdateImg(
			cat.id,
			fileName,
		);
		console.log(newCat);
		return newCat;
	}
}
