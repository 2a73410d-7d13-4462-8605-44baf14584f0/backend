import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractEntity } from './abstract.entity';

export class AbstractDTO {
  @ApiPropertyOptional()
  createdby?: string;

  @ApiPropertyOptional()
  createdtime?: Date;

  constructor(entity: AbstractEntity, options?: { excludeFields: boolean }) {
    if (!options.excludeFields) {
      this.createdby = entity.createdby;
      this.createdtime = entity.createdtime;
    }
  }
}
