import { AbstractDTO } from './abstract.dto';
import { Column } from 'typeorm';
import { Constructor } from './types';

export interface IAbstractEntity<DTO extends AbstractDTO, O = never> {
  createdby: string;
  createdtime: Date;

  toDto(options?: O): DTO;
}

export abstract class AbstractEntity<
  DTO extends AbstractDTO = AbstractDTO,
  O = never,
> implements IAbstractEntity<DTO, O>
{
  @Column({ type: 'varchar', name: 'createdby', nullable: true })
  createdby: string;

  @Column({
    type: 'timestamptz',
    name: 'createdtime',
    default: 'NOW()',
  })
  createdtime: Date;

  private dtoClass?: Constructor<DTO, [AbstractEntity, O?]>;

  toDto(options?: O | undefined): DTO {
    const dtoClass = this.dtoClass;

    if (!dtoClass) {
      throw new Error(
        `Use @UseDto on class (${this.constructor.name}) be able to call toDto()`,
      );
    }

    return new dtoClass(this, options);
  }
}
