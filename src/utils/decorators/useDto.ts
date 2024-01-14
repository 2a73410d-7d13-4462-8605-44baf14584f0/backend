import type { AbstractEntity } from '../abstract.entity';
import type { AbstractDTO } from '../abstract.dto';
import type { Constructor } from '../types';

export function UseDto(
  dtoClass: Constructor<AbstractDTO, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
