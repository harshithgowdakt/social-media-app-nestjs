import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) {}

  async follow(userId: number, followerId: number) {
    const follow = this.followerRepository.create({
      user: { userId },
      follower: { userId: followerId },
    });
    return this.followerRepository.save(follow);
  }

  async unfollow(followerId: number) {
    await this.followerRepository.delete(followerId);
    return { message: `Unfollowed successfully.` };
  }
}