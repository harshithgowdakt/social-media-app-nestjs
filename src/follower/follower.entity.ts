import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.followers)
  user: User;

  @ManyToOne(() => User, (user) => user.following)
  follower: User;
}
