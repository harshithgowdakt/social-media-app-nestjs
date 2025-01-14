import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { User } from './user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users with optional pagination
  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.userService.findAll({ page, limit });
  }

  // Get a single user by ID
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  // Create a new user
  @Post()
  async createUser(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  // Update an existing user
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: User) {
    return this.userService.update(id, updateUserDto);
  }

  // Delete a user by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  // Search for users by username or email
  @Get('search')
  async searchUsers(@Query('query') query: string) {
    return this.userService.search(query);
  }
}
