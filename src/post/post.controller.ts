import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.postService.findAll({ page, limit });
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
