import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformUrl } from './transform-url.entity';
import { Repository } from 'typeorm';
import { GenerateShortUrl } from './transform-url.transaction';
import { Redis } from 'ioredis';
import { UrlTrackService } from 'src/url-track/url-track.service';

@Injectable()
export class TransformUrlService {
  constructor(
    @InjectRepository(TransformUrl)
    private readonly transformUrlRepo: Repository<TransformUrl>,
    private readonly generateUrlTransaction: GenerateShortUrl,
    private readonly trackUrlService: UrlTrackService,
  ) {}

  private readonly redis = new Redis({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
  });

  async getAll() {
    try {
      return await this.transformUrlRepo.find();
    } catch (error) {
      throw error;
    }
  }

  async getByShort(short: string) {
    try {
      return await this.transformUrlRepo.findOne({
        where: {
          shortUrl: short,
        },
        relations: {
          urlTracker: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async generateUrl({ url, name }): Promise<TransformUrl> {
    try {
      const createUrl = await this.generateUrlTransaction.run({ url, name });
      await this.redis.set(createUrl.shortUrl, url);
      return createUrl;
    } catch (error) {
      throw error;
    }
  }

  async userUsage(name: string) {
    try {
      return await this.transformUrlRepo
        .createQueryBuilder('tu')
        .select('COUNT(tu.short_url)', 'total_url')
        .addSelect('SUM(ut.createdtime)', 'total_usage')
        .addSelect('createdtime', 'date')
        .innerJoin('tu.user', 'u')
        .innerJoin('tu.urlTracker', 'ut')
        .where(
          'tu.createdtime between current_date - interval "7 days" and current_date',
        )
        .andWhere('u.name LIKE :name', { name })
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }

  async getOriginalUrl(url: string): Promise<string> {
    try {
      return await this.redis.get(url);
    } catch (error) {
      throw error;
    }
  }

  async updateTracker(url: string) {
    try {
      const transform = await this.transformUrlRepo.findOne({
        where: {
          shortUrl: url,
        },
      });
      return await this.trackUrlService.updateCounter(transform.id);
    } catch (error) {
      throw error;
    }
  }
}
