import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	// cat의 DB를 사용하기 위해서 DI
	constructor(private readonly catsRepository: CatsRepository, private jwtService: JwtService) { }

	async jwtLogIn(data: LoginRequestDto) {
		const { email, password } = data;

		// 해당하는 email이 있는지
		const cat = await this.catsRepository.findCatByEmail(email);

		if (!cat) {
			throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
		}

		// password 일치여부 판단
		const isPasswordValidated: boolean = await bcrypt.compare(
			password,
			cat.password,
		);

		if (!isPasswordValidated) {
			throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
		}

		const payload = { email: email, sub: cat.id }; // sub : token의 제목을 의미

		return {
			token: this.jwtService.sign(payload),
		};
	}

}
