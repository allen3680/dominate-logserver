import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('logger') private queue: Queue) {}

  add<T>(args: { data: T; name?: string; options?: JobOptions }) {
    const { name, data, options } = args;
    if (!name) {
      return this.queue.add(data, options);
    }
    return this.queue.add(name, data, options);
  }
}
