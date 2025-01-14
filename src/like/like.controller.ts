import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likePost(
    @Body() { postId, userId }: { postId: number; userId: number },
  ) {
    return this.likeService.like(postId, userId);
  }

  @Delete(':id')
  async unlikePost(@Param('id') id: number) {
    return this.likeService.unlike(id);
  }
}
