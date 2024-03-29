import { User } from 'src/user/user.entity';
import { AbstractEntity } from 'src/utils/abstract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TransformUrlDTO } from './dto/transform-url.dto';
import { UrlTrack } from 'src/url-track/url-track.entity';

@Entity()
export class TransformUrl extends AbstractEntity<TransformUrlDTO> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, name: 'original_url', type: 'varchar' })
  originalUrl: string;

  @Column({ nullable: false, unique: true, name: 'short_url', type: 'varchar' })
  shortUrl: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => UrlTrack, (tracker) => tracker.transformUrl)
  urlTracker: UrlTrack[];
}
