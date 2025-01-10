import { Injectable, Type } from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';

@Injectable()
export class ObjectTransformer {
  transform<T>(
    value: unknown,
    type: Type<T>,
    options?: ClassTransformOptions,
  ): T {
    const instance: T = plainToInstance(type, value, options);
    return instance;
  }
}
