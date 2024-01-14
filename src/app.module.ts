import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformUrlModule } from './transform-url/transform-url.module';
import { UrlTrackModule } from './url-track/url-track.module';
import { UserModule } from './user/user.module';
import { options } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    TransformUrlModule,
    UrlTrackModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
