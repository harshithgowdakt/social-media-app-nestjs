import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Get all users with optional pagination
  async findAll({ page, limit }: { page: number; limit: number }) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['followers', 'following', 'posts', 'comments', 'likes'],
    });
    return { users, total, page, limit };
  }

  // Get a single user by ID
  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { userId: id },
      relations: ['followers', 'following', 'posts', 'comments', 'likes'],
    });
  }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Update an existing user's details
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Delete a user by ID
  async delete(id: number) {
    await this.userRepository.delete(id);
    return { message: `User with ID ${id} deleted successfully.` };
  }

  // Search users by username or email
  async search(query: string) {
    return this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
      relations: ['followers', 'following', 'posts'],
    });
  }
}
