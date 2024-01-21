import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/utils/abstract.transaction';
import { GenerateUrlDTO } from './dto/transform-url.service.dto';
import { Connection, EntityManager } from 'typeorm';
import { generate } from 'short-uuid';
import { UserService } from 'src/user/user.service';
import { TransformUrl } from './transform-url.entity';
import { UrlTrack } from 'src/url-track/url-track.entity';

@Injectable()
export class GenerateShortUrl extends BaseTransaction<
  GenerateUrlDTO,
  TransformUrl
> {
  constructor(
    connection: Connection,
    private readonly userService: UserService,
  ) {
    super(connection);
  }

  protected async execute(data: GenerateUrlDTO, manager: EntityManager) {
    const { name, url } = data;
    try {
      const newUrl = generate();

      const user = await this.userService.getByName(name);
      if (!user)
        throw new HttpException("There's no user", HttpStatus.BAD_REQUEST);

      const createShortUrl = manager.create(TransformUrl, {
        shortUrl: `${newUrl}`,
        originalUrl: url,
        userId: user.id,
      });

      const saveShortUrl = await manager.save(createShortUrl);

      const createTracker = manager.create(UrlTrack, {
        count: 0,
        transformUrlId: saveShortUrl.id,
      });

      manager.save(createTracker);
      return saveShortUrl;
    } catch (error) {
      throw error;
    }
  }
}
