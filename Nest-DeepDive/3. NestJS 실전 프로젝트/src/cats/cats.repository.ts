import { Comments, CommentsSchema } from './../comments/comments.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from "mongoose";
import { Cat } from "./cats.schema";
import * as mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
	constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) { }

	async existsByEmail(email: string): Promise<any> {
		const result = await this.catModel.exists({ email });
		return result;
	}

	async create(cat: CatRequestDto): Promise<Cat> {
		return await this.catModel.create(cat);
	}

	async findCatByEmail(email: string): Promise<Cat | null> {
		const cat = await this.catModel.findOne({ email });
		return cat;
	}

	// Types.ObjectId가 들어오는 경우 : author가 들어오는 경우
	async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
		// password를 제외한 feild의 data를 가져오기 위함
		const cat = await this.catModel.findById(catId).select("-password"); // .select("email name"); 이메일과 이름만 가져오기
		return cat;
	}

	async findByIdAndUpdateImg(id: string, fileName: string) {
		const cat = await this.catModel.findById(id); // 현재 login된 고양이의 id로 고양이를 찾고
		cat.imgUrl = `http://localhost:8000/media/${fileName}`; // schema에서 default로 설정된 image값 설정 
		const newCat = await cat.save(); // save 메소드로 저장 (commit)
		console.log(newCat);
		return newCat.readOnlyData; // readOnlyData로 필요한 정보만 필터링하여 return
	}

	async findAll() {
		// 스키마 모델 가져오기
		const CommentsModel = mongoose.model('comments', CommentsSchema);

		const result = await this.catModel
			.find()
			.populate('comments', CommentsModel); // 다른 document랑 이어주는 populate 메서드

		return result;
	}
}