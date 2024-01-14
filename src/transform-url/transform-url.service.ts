import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformUrl } from './transform-url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransformUrlService {
  constructor(
    @InjectRepository(TransformUrl)
    private readonly transformUrlRepo: Repository<TransformUrl>,
  ) {}

  async getAll() {
    try {
      return await this.transformUrlRepo.find();
    } catch (error) {
      throw error;
    }
  }
}
