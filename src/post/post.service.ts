import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    return this.postRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['user', 'comments', 'likes'],
    });
  }

  async findOne(postId: number) {
    return this.postRepository.findOne({
      where: { postId },
      relations: ['user', 'comments', 'likes'],
    });
  }

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async update(postId: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(postId, updatePostDto);
    return this.findOne(postId);
  }

  async delete(postId: number) {
    await this.postRepository.delete(postId);
    return { message: `Post with ID ${postId} deleted successfully.` };
  }
}
