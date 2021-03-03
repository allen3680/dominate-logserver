import { Global, Module } from '@nestjs/common';
import { ConfigService } from 'src/core';
import { LoggerService, QueueService } from 'src/service';

@Global()
@Module({
  providers: [
    {
      provide: LoggerService,
      inject: [ConfigService],
      useFactory: (config: ConfigService): LoggerService =>
        new LoggerService(config),
    },
    QueueService,
  ],
  exports: [LoggerService, QueueService],
})
export class ServiceModule {}
