import { PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

// class로 하는 이유
// 데코레이터를 사용하기 위함
// 재사용 하기 위함
export class CatRequestDto extends PickType(Cat, [
	'email',
	'name',
	'password',
] as const) { }