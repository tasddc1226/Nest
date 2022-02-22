import { CatsModule } from 'src/cats/cats.module';
import { Module } from '@nestjs/common';
import { Comments, CommentsSchema } from './comments.schema';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    CatsModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule { }
