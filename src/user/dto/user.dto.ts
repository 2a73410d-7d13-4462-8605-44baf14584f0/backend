import { ApiProperty } from '@nestjs/swagger';
import { AbstractDTO } from 'src/utils/abstract.dto';
import { User } from '../user.entity';

export class UserDTO extends AbstractDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(userEntity: User) {
    super(userEntity, { excludeFields: true });
  }
}
