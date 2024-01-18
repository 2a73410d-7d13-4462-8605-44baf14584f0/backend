import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserBodyDTO } from './dto/user.service.dto';
import { User } from './user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: User })
  async createUser(@Body() body?: UserBodyDTO): Promise<User> {
    try {
      return await this.userService.createUser(body.name);
    } catch (error) {
      throw error;
    }
  }
}
