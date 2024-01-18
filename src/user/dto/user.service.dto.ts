import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserBodyDTO {
  @ApiPropertyOptional()
  @IsString()
  name: string;
}
