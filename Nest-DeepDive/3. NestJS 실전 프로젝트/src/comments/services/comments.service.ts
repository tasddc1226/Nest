import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { CatsRepository } from './../../cats/cats.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {

	constructor(
		@InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
		private readonly catsRepository: CatsRepository,
	) { }

	async getAllComments() {
		try {
			const comments = await this.commentsModel.find();
			return comments;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	// id: string -> 고양이의 id
	async createComment(id: string, commentData: CommentsCreateDto) {
		// console.log(comments); 
		try {
			// 작성할 target 고양이를 id로 찾는다
			const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id,);

			// 구조분해 할당
			const { contents, author } = commentData;

			// 해당하는 작성자의 정보를 가져옴 why? 해당하는 작성자에 대한 변조 가능성에 대한 Check
			const validateAuthor = await this.catsRepository.findCatByIdWithoutPassword(author);

			const newComment = new this.commentsModel({
				author: validateAuthor._id, // 작성자의 id
				contents,
				info: targetCat._id,
			});
			return await newComment.save();
		} catch (error) {
			throw new BadRequestException(error.massage);
		}
	}

	// id에 해당하는 댓글에 대한 좋아요 수 
	async plusLike(id: string) {
		try {
			// 댓글 id로 댓글 하나 가져오기
			const comment = await this.commentsModel.findById(id);
			comment.likes += 1; // likes field 증가
			return await comment.save();
		} catch (error) { }
	}
}
