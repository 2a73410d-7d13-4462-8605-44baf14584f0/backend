import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlTrack } from './url-track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrlTrackService {
  constructor(
    @InjectRepository(UrlTrack)
    private readonly urlTrackRepository: Repository<UrlTrack>,
  ) {}

  async getAll(): Promise<UrlTrack[]> {
    try {
      return await this.urlTrackRepository.find();
    } catch (error) {
      throw error;
    }
  }

  create(id: number | string): Promise<UrlTrack> {
    try {
      if (!id) throw new HttpException('No id input', HttpStatus.BAD_REQUEST);
      const insert = this.urlTrackRepository.create({
        count: 0,
        updatedtime: Date.now(),
        transformUrlId: +id,
      });
      return this.urlTrackRepository.save(insert);
    } catch (error) {
      throw error;
    }
  }

  async updateCounter(id: number): Promise<UrlTrack> {
    try {
      const datas = await this.urlTrackRepository.findOne({
        where: {
          transformUrlId: id,
        },
      });
      return await this.urlTrackRepository.save({
        ...datas,
        count: datas?.count + 1,
      });
    } catch (error) {
      throw error;
    }
  }
}
