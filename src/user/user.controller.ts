import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body) {
    try {
      return await this.userService.createUser(body.name);
    } catch (error) {
      throw error;
    }
  }
}
