import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { TransformUrlService } from './transform-url/transform-url.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly transformUrlService: TransformUrlService) {}

  @Throttle({ default: { limit: 10, ttl: 3000 } })
  @Get('url/:short')
  async redirectUrl(
    @Param('short') shortUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    const original = await this.transformUrlService.getOriginalUrl(shortUrl);

    if (original) {
      this.transformUrlService.updateTracker(shortUrl);
      res.redirect(301, original);
    } else {
      res.status(404).send('URL not found');
    }
  }
}
