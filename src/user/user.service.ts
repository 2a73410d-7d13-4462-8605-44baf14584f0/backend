import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { generate } from 'short-uuid';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async createUser(name: string): Promise<UserDTO> {
    try {
      if (!name) {
        name = `Guest:${generate()}`;
      }
      const insert = this.userRepository.create({
        name: name,
      });
      return this.userRepository.save(insert);
    } catch (error) {
      throw error;
    }
  }

  async getByName(name: string): Promise<User> {
    try {
      if (!name)
        throw new HttpException('No User Available', HttpStatus.BAD_REQUEST);
      return await this.userRepository.findOne({
        where: { name: name },
      });
    } catch (error) {
      throw error;
    }
  }
}
