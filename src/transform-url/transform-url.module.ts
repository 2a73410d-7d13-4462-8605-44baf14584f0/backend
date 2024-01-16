import { Module } from '@nestjs/common';
import { TransformUrlService } from './transform-url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformUrl } from './transform-url.entity';
import { TransformUrlController } from './transform-url.controller';
import { UserModule } from 'src/user/user.module';
import { UrlTrackModule } from 'src/url-track/url-track.module';
import { GenerateShortUrl } from './transform-url.transaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransformUrl]),
    UserModule,
    UrlTrackModule,
  ],
  providers: [TransformUrlService, GenerateShortUrl],
  controllers: [TransformUrlController],
  exports: [TransformUrlService],
})
export class TransformUrlModule {}
