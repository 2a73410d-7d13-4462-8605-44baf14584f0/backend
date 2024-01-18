import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransformUrlService } from './transform-url.service';
import { TransformUrl } from './transform-url.entity';
import {
  GenerateUrlDTO,
  StatisticListDTO,
} from './dto/transform-url.service.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransformUrlDTO } from './dto/transform-url.dto';

@ApiTags('Transforming URL')
@Controller('transform-url')
export class TransformUrlController {
  constructor(private readonly transformUrlService: TransformUrlService) {}

  @Get()
  @ApiOkResponse({ type: [TransformUrlDTO] })
  async getAll(): Promise<TransformUrlDTO[]> {
    try {
      return await this.transformUrlService.getAll();
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOkResponse({ type: TransformUrl })
  async generateUrl(@Body() body: GenerateUrlDTO): Promise<TransformUrl> {
    try {
      return await this.transformUrlService.generateUrl(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('statistics')
  @ApiOkResponse({ type: StatisticListDTO })
  async getWeeklyStatistics(
    @Query() { user }: { user: string },
  ): Promise<StatisticListDTO> {
    try {
      return await this.transformUrlService.userUsage(user);
    } catch (error) {
      throw error;
    }
  }
}
