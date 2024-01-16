import { ApiProperty } from '@nestjs/swagger';

export class GenerateUrlDTO {
  @ApiProperty()
  url: string;

  @ApiProperty()
  name: string;
}
