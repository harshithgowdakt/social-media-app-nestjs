import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Comment } from "../comments/comments.entity";
import { Like } from '../likes/likes.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  mediaUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
