import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowerController } from './follower.controller';
import { Follower } from './follower.entity';
import { FollowerService } from './follower.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
