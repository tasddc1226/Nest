import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// class로 하는 이유
// 데코레이터를 사용하기 위함
// 재사용 하기 위함
export class CatRequestDto {
	// API 속성 데코레이트
	@ApiProperty({
		example: 'example@gmail.com',
		description: 'email',
		required: true,
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		example: '12345',
		description: 'password',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	password: string;

	@ApiProperty({
		example: 'amanda',
		description: 'name',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}