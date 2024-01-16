import { ApiProperty } from '@nestjs/swagger';
import { AbstractDTO } from 'src/utils/abstract.dto';
import { TransformUrl } from '../transform-url.entity';

export class TransformUrlDTO extends AbstractDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  shortUrl: string;

  @ApiProperty()
  userId: number;

  constructor(transformUrlEntity: TransformUrl) {
    super(transformUrlEntity, { excludeFields: true });
  }
}
