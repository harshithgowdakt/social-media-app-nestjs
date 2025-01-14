import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAllByPost(postId: number) {
    return this.commentRepository.find({
      where: { post: { postId } },
      relations: ['user', 'post'],
    });
  }

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  async delete(commentId: number) {
    await this.commentRepository.delete(commentId);
    return { message: `Comment with ID ${commentId} deleted successfully.` };
  }
}
