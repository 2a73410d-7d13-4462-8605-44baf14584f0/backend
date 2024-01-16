import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransformUrlService } from './transform-url.service';
import { TransformUrl } from './transform-url.entity';

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

  @Post()
  async generateUrl(@Body() body): Promise<TransformUrl> {
    try {
      return await this.transformUrlService.generateUrl(body);
    } catch (error) {
      throw error;
    }
  }
}
