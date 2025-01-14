import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  likeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
