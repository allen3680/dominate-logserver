import { LoggerProcessor } from '.';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [LoggerProcessor],
  exports: [LoggerProcessor],
})
export class ProcessorModule {}
