import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { LikeController } from './like/like.controller';
import { CommentController } from './comment/comment.controller';
import { PostController } from './post/post.controller';
import { PostController } from './post/post.controller';
import { CommentController } from './comment/comment.controller';
import { PostService } from './post/post.service';
import { CommentService } from './comment/comment.service';
import { LikeService } from './like/like.service';
import { FollowerController } from './follower/follower.controller';
import { FollowerService } from './follower/follower.service';

@Module({
  imports: [UsersModule],
  controllers: [
    AppController,
    LikeController,
    CommentController,
    PostController,
    PostController,
    CommentController,
    FollowerController,
  ],
  providers: [
    AppService,
    PostService,
    CommentService,
    LikeService,
    FollowerService,
  ],
})
export class AppModule {}
