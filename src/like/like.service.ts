import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async like(postId: number, userId: number) {
    const like = this.likeRepository.create({
      post: { id: postId },
      user: { id: userId },
    });
    return this.likeRepository.save(like);
  }

  async unlike(likeId: number) {
    await this.likeRepository.delete(likeId);
    return { message: `Like with ID ${likeId} removed successfully.` };
  }
}
