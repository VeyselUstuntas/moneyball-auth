import { Global, Module } from '@nestjs/common';
import { ObjectTransformer } from './object-transformer';

@Global()
@Module({
  providers: [ObjectTransformer],
  exports: [ObjectTransformer],
})
export class HelpersModule {}
