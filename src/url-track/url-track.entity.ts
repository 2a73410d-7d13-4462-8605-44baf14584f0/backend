import { TransformUrl } from 'src/transform-url/transform-url.entity';
import { AbstractEntity } from 'src/utils/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UrlTrackDTO } from './dto/url-track.dto';

@Entity()
export class UrlTrack extends AbstractEntity<UrlTrackDTO> {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TransformUrl, (transformUrl) => transformUrl.id, {
    onDelete: 'CASCADE',
  })
  transformUrl: TransformUrl;

  @Column({ nullable: false })
  count: number;

  @Column({ nullable: false })
  transformUrlId: number;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  updatedtime: Date;
}
