import { Body, Controller, Post } from '@nestjs/common';
import { QueueService } from 'src/service';
import { LogEntry } from 'winston';

@Controller('log')
export class LogController {
  constructor(private queueService: QueueService) {}

  @Post()
  createLog(@Body() data: LogEntry) {
    this.queueService.add({ name: 'log', data });
    return 'OK';
  }
}
