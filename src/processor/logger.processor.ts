import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { LoggerService } from 'src/service';
import { LogEntry } from 'winston';

@Processor('logger')
export class LoggerProcessor {
  constructor(private loggerService: LoggerService) {}

  @Process({ name: 'log', concurrency: 100 })
  log(job: Job<LogEntry>) {
    this.loggerService.log({ level: 'info', message: 'log', ...job.data });
  }
}
