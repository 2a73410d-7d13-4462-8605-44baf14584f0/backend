import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserBodyDTO } from './dto/user.service.dto';
import { UserDTO } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({ type: UserDTO })
  async createUser(@Body() body?: UserBodyDTO): Promise<UserDTO> {
    try {
      return await this.userService.createUser(body.name);
    } catch (error) {
      throw error;
    }
  }
}
