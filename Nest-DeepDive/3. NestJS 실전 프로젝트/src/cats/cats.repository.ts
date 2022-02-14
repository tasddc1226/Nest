import { CatRequestDto } from './dto/cats.request.dto';
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";


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

	async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
		// password를 제외한 feild의 data를 가져오기 위함
		const cat = await this.catModel.findById(catId).select("-password"); // .select("email name"); 이메일과 이름만 가져오기
		return cat;
	}
}