import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class GenerateUrlDTO {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsString()
  name: string;
}

export class UserUsageDTO {
  @ApiProperty()
  @IsNumber()
  total_url: number;

  @ApiProperty()
  @IsNumber()
  total_usage: number;

  @ApiProperty()
  @IsDate()
  date: Date;
}

export class TransformUrlUserDTO {
  @ApiProperty()
  @IsString()
  original_url: string;

  @ApiProperty()
  @IsString()
  short_url: string;

  @ApiProperty()
  @IsNumber()
  count: number;
}

export class StatisticListDTO {
  @ApiProperty({
    example: `
  [
    {
      "count": 0,
      "original_url": "string",
      "short_url": "string"
    }
  ]
  `,
  })
  list: TransformUrlUserDTO[];

  @ApiProperty({
    example: `
  [
    {
      "total_url": "0",
      "total_usage": "0",
      "date":"${new Date()}"
    }
  ]
  `,
  })
  statistics: UserUsageDTO[];
}
