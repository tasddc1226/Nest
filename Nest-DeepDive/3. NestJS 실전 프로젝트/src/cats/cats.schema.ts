import { Schema, SchemaOptions, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Comments } from './../comments/comments.schema';
import { ApiProperty } from '@nestjs/swagger';
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

	readonly readOnlyData: {
		id: string;
		email: string;
		name: string;
		imgUrl: string;
	};

	readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
	return {
		id: this.id,
		email: this.email,
		name: this.name,
		imgUrl: this.imgUrl,
		comments: this.comments,
	};
});

// comments라는 virtual feild를 만듦으로써 다른 documents와 연결을 할 수 있다
_CatSchema.virtual('comments', {
	ref: 'comments',
	localField: '_id',
	foreignField: 'info',
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
