import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LikesController } from './likes/likes.controller';
import { CommentController } from './comment/comment.controller';
import { PostController } from './post/post.controller';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';
import { PostsService } from './posts/posts.service';
import { CommentsService } from './comments/comments.service';
import { LikesService } from './likes/likes.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, LikesController, CommentController, PostController, PostsController, CommentsController],
  providers: [AppService, PostsService, CommentsService, LikesService],
})
export class AppModule {}
