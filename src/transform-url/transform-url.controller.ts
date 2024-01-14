import { Controller, Get } from '@nestjs/common';
import { TransformUrlService } from './transform-url.service';

@Controller('transform-url')
export class TransformUrlController {
  constructor(private readonly transformUrlService: TransformUrlService) {}

  @Get()
  async getAll() {
    try {
      return await this.transformUrlService.getAll();
    } catch (error) {
      throw error;
    }
  }
}
