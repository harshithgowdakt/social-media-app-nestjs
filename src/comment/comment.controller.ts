import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getCommentsForPost(@Query('postId') postId: number) {
    return this.commentService.findAllByPost(postId);
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.commentService.delete(id);
  }
}
