import { Module } from '@nestjs/common';
import { UrlTrackService } from './url-track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlTrack } from './url-track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlTrack])],
  providers: [UrlTrackService],
  exports: [UrlTrackService],
})
export class UrlTrackModule {}
