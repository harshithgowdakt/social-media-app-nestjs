import { Controller, Post, Delete, Param, Body } from '@nestjs/common';

import { FollowerService } from './follower.service';

@Controller('followers')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  async followUser(
    @Body() { userId, followerId }: { userId: number; followerId: number },
  ) {
    return this.followerService.follow(userId, followerId);
  }

  @Delete(':id')
  async unfollowUser(@Param('id') id: number) {
    return this.followerService.unfollow(id);
  }
}
