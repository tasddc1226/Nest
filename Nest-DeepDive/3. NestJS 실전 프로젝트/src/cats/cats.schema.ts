import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

// Schema에 대한 옵션 : 타임 스템프 생성을 위함 
const options: SchemaOptions = {
	timestamps: true,
};

@Schema(options)
export class Cat extends Document {
	@Prop({
		required: true,
		unique: true
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Prop({
		required: true
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@Prop({
		required: true
	})
	@IsString()
	@IsNotEmpty()
	password: string;

	@Prop()
	@IsString()
	imgUrl: string;

	readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// Schema에 virtual이라는 메서드를 사용해서 필드 name으로 모델을 필요한 데이터만 전달해주기 위함
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
	return {
		id: this.id, // this는 하나의 객체를 의미. 
		email: this.email,
		name: this.name,
	}
})