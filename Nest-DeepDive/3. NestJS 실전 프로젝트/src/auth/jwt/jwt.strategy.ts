import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { // jwt 전략과 관련된 내용 -> 인증을 할 때 사용!!
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'secret',
			ignoreExpiration: false,
		});
	}

	// front에서 저장된 jwt가 요청되었을 때, payload에 대한 유효성 검증
	// async validate(payload) { 

	// }
}