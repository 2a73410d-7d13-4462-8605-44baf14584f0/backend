import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformUrl } from './transform-url.entity';
import { Repository } from 'typeorm';
import { GenerateShortUrl } from './transform-url.transaction';
import { Redis } from 'ioredis';
import { UrlTrackService } from 'src/url-track/url-track.service';
import { UrlTrack } from 'src/url-track/url-track.entity';
import {
  DetailShortBodyDTO,
  DetailShortResponseDTO,
  GenerateUrlDTO,
  StatisticListDTO,
  TransformUrlUserDTO,
  UserUsageDTO,
} from './dto/transform-url.service.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { TransformUrlDTO } from './dto/transform-url.dto';

@Injectable()
export class TransformUrlService {
  constructor(
    @InjectRepository(TransformUrl)
    private readonly transformUrlRepo: Repository<TransformUrl>,
    private readonly generateUrlTransaction: GenerateShortUrl,
    private readonly trackUrlService: UrlTrackService,
    private readonly userService: UserService,
  ) {}

  private readonly redis = new Redis({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
  });

  async getAll(): Promise<TransformUrlDTO[]> {
    try {
      const data = await this.trackUrlService.getAll();
      console.log(data);
      return await this.transformUrlRepo.find({
        relations: {
          user: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getByShort(short: string): Promise<TransformUrl> {
    try {
      return await this.transformUrlRepo.findOne({
        where: {
          shortUrl: short,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async generateUrl({ url, name }: GenerateUrlDTO): Promise<TransformUrl> {
    try {
      const createUrl = await this.generateUrlTransaction.run({ url, name });
      await this.redis.set(createUrl.shortUrl, url);
      return createUrl;
    } catch (error) {
      throw error;
    }
  }

  async getAllByUser(id: number): Promise<TransformUrlUserDTO[]> {
    try {
      return await this.transformUrlRepo
        .createQueryBuilder('tu')
        .select('tu.original_url', 'original_url')
        .addSelect('tu.short_url', 'short_url')
        .addSelect('ut.count', 'count')
        .innerJoin('tu.urlTracker', 'ut')
        .where('user_id = :id', { id })
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }

  async userUsage(name: string): Promise<StatisticListDTO> {
    try {
      const getUser: User = await this.userService.getByName(name);

      const listUser: TransformUrlUserDTO[] = await this.getAllByUser(
        getUser.id,
      );

      const data: Promise<UserUsageDTO[]> = this.transformUrlRepo
        .createQueryBuilder('tu')
        .select('COUNT(tu.short_url)', 'total_url')
        .addSelect('SUM(ut.count)', 'total_usage')
        .addSelect("DATE_TRUNC('day', tu.createdtime)", 'date')
        .innerJoin('tu.urlTracker', 'ut')
        .where('user_id = :id', { id: getUser.id })
        .andWhere("tu.createdtime >= CURRENT_DATE - INTERVAL '7 days'")
        .groupBy('date')
        .getRawMany();

      const [list, statistics] = await Promise.all([listUser, data]);

      return {
        list,
        statistics,
      };
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

  async updateTracker(url: string): Promise<UrlTrack> {
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

  async detailShort({
    short,
  }: DetailShortBodyDTO): Promise<DetailShortResponseDTO> {
    try {
      const detail = await this.getByShort(short);
      const list = await this.transformUrlRepo
        .createQueryBuilder('tu')
        .select('SUM(count)', 'total_usage')
        .addSelect('tu.createdtime', 'date')
        .innerJoin('tu.urlTracker', 'ut')
        .where('tu.user_id = :id', { id: detail.userId })
        .andWhere('tu.short_url = :short', { short })
        .groupBy('date')
        .getRawMany();

      return {
        ...detail,
        statistics: list,
      };
    } catch (error) {
      throw error;
    }
  }
}
