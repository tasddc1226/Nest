import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CatsRepository } from "src/cats/cats.repository";
import { payload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // jwt 전략과 관련된 내용 -> 인증을 할 때 사용!!
	constructor(private readonly catsRepository: CatsRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'secret',
			ignoreExpiration: false,
		});
	}

	// front에서 저장된 jwt가 요청되었을 때, payload에 대한 유효성 검증
	// 즉, decoding 된 payload가 적합한지 검증하는 부분
	async validate(payload: payload) {
		const cat = await this.catsRepository.findCatByIdWithoutPassword(
			payload.sub,
		);
		// password feild가 제외된 cat의 객체
		if (cat) {
			return cat; // requset.user에 cat 정보가 담기게 됨
		} else {
			throw new UnauthorizedException("접근 오류");
		}
	}
}