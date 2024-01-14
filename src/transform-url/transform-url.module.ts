import { Module } from '@nestjs/common';
import { TransformUrlService } from './transform-url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformUrl } from './transform-url.entity';
import { TransformUrlController } from './transform-url.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TransformUrl])],
  providers: [TransformUrlService],
  controllers: [TransformUrlController],
})
export class TransformUrlModule {}
