import { AbstractEntity } from 'src/utils/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserDTO } from './dto/user.dto';

@Entity()
export class User extends AbstractEntity<UserDTO> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}
