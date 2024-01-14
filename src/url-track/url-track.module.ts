import { Module } from '@nestjs/common';
import { UrlTrackService } from './url-track.service';

@Module({
  providers: [UrlTrackService],
})
export class UrlTrackModule {}
