import { AbstractEntity } from 'src/utils/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { TransformUrl } from 'src/transform-url/transform-url.entity';

@Entity()
export class User extends AbstractEntity<UserDTO> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => TransformUrl, (transform) => transform.userId)
  transformUrl: TransformUrl[];
}
