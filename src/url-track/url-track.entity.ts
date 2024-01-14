import { TransformUrl } from 'src/transform-url/transform-url.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class UrlTrack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TransformUrl, (transformUrl) => transformUrl.id, {
    onDelete: 'CASCADE',
  })
  transformUrl: TransformUrl;

  @Column({ nullable: false })
  count: number;

  @Column({ type: 'timestamptz', default: 'NOW()' })
  updatedtime: Date;
}
