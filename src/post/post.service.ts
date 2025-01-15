import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/user.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll({ page, limit }: { page: number; limit: number }) {
    return this.postRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['comments', 'likes'],
    });
  }

  async findOne(postId: number) {
    return this.postRepository.findOne({
      where: { id: postId },
      relations: ['comments', 'likes'],
    });
  }

  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: { id: createPostDto.userId },
      select: ['id'], // Only select what you need
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPostDto.userId} not found`,
      );
    }
    // Create post instance
    const post = this.postRepository.create({
      content: createPostDto.content,
      mediaUrl: createPostDto.mediaUrl,
      user: { id: user.id }, // Just set the ID if you don't need the full user object
    });

    // Save and return the post with relations if needed
    return await this.postRepository.save(post);
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
