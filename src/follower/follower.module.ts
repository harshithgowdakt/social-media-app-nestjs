import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
