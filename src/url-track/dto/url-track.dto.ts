import { ApiProperty } from '@nestjs/swagger';
import { AbstractDTO } from 'src/utils/abstract.dto';
import { UrlTrack } from '../url-track.entity';

export class UrlTrackDTO extends AbstractDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  updatedtime: Date;

  @ApiProperty()
  transformUrlId: number;

  constructor(urlTrack: UrlTrack) {
    super(urlTrack, { excludeFields: true });
  }
}
