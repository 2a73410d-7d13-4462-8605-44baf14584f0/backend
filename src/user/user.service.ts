import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { generate } from 'short-uuid';

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

  async createUser(name: string): Promise<User> {
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
      return await this.userRepository.findOne({
        where: { name: name },
      });
    } catch (error) {
      throw error;
    }
  }
}
