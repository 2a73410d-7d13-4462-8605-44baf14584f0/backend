import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TransformUrlService } from './transform-url/transform-url.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly transformUrlService: TransformUrlService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('short')
  async redirectUrl(
    @Param('short') shortUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    const original = await this.transformUrlService.getOriginalUrl(shortUrl);

    if (original) {
      res.redirect(301, original);
    } else {
      res.status(404).send('URL not found');
    }
  }
}
