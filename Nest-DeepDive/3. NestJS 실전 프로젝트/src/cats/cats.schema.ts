import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

// Schema에 대한 옵션 : 타임 스템프 생성을 위함 
const options: SchemaOptions = {
	timestamps: true,
};

@Schema(options)
export class Cat extends Document {
	// API 속성 데코레이트
	@ApiProperty({
		example: 'example@gmail.com',
		description: 'email',
		required: true,
	})
	@Prop({
		required: true,
		unique: true
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		example: 'amanda',
		description: 'name',
		required: true,
	})
	@Prop({
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		example: '12345',
		description: 'password',
		required: true,
	})
	@Prop({
		required: true
	})
	@IsString()
	@IsNotEmpty()
	password: string;

	@Prop({
		default:
			'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg'
	})
	@IsString()
	imgUrl: string;

	readonly readOnlyData: { id: string; email: string; name: string, imgUrl: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// Schema에 virtual이라는 메서드를 사용해서 필드 name으로 모델을 필요한 데이터만 전달해주기 위함
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
	return {
		id: this.id, // this는 하나의 객체를 의미. 
		email: this.email,
		name: this.name,
		imgUrl: this.imgUrl
	}
})