import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
};

@Schema(options)
export class Comments extends Document {
	@ApiProperty({
		description: '작성한 고양이의 id',
		required: true,
	})
	@Prop({
		type: Types.ObjectId, // mongoDB가 id를 string으로 바꿔줌
		required: true,
		ref: 'cats', // 참조할 스키마 (Cat이지만 자동으로 cats 복수형태로 만들어준다)
	})
	@IsNotEmpty()
	author: Types.ObjectId;

	@ApiProperty({
		description: '댓글 내용',
		required: true,
	})
	@Prop({
		required: true
	})
	@IsNotEmpty()
	@IsString()
	contents: string;

	@ApiProperty({
		description: '좋아요 개수',
	})
	@Prop({
		default: 0,
	})
	@IsPositive()
	likes: number;

	@ApiProperty({
		description: '작성 대상 정보',
		required: true,
	})
	@Prop({
		type: Types.ObjectId,
		required: true,
		ref: 'cats',
	})
	@IsNotEmpty()
	info: Types.ObjectId;

}

export const CommentsSchema = SchemaFactory.createForClass(Comments);