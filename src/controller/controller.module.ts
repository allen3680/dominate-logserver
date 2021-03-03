import { Global, Module } from '@nestjs/common';
import { LogController } from './log.controller';

@Global()
@Module({
  controllers: [LogController],
})
export class ControllerModule {}
