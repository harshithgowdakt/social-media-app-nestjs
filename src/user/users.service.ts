import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, Like } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

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
    });
    const mappedUser = users.map((u) => {
      const { password, createdAt, updatedAt, ...result } = u;
      return result;
    });
    return { mappedUser, total, page, limit };
  }

  // Get a single user by ID
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      const { password, createdAt, updatedAt, ...result } = user;
      return result;
    }

    return null;
  }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10; // Define the number of salt rounds
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Replace the plain password with the hashed password
    createUserDto.password = hashedPassword;

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
    const users = await this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });

    if (users) {
      return users.map((u) => {
        const { password, createdAt, updatedAt, ...result } = u;
        return result;
      });
    }

    return null;
  }
}
