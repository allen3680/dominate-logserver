import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from 'src/core';
import { ConfigType, LogStatus } from 'src/models';
import { v4 as uuid } from 'uuid';
import { createLogger, format, LogEntry, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  /** Logger 實體 */
  logger: Logger;

  /** Logger 設定檔 */
  get loggerConfig(): any {
    return this.configService.get(ConfigType.Logger);
  }

  constructor(private configService: ConfigService) {
    this.initLogger();
  }

  /** 初始化 Logger */
  initLogger() {
    let { filename, dirname, auditFile } = this.loggerConfig;
    filename = (filename || 'Points_%DATE%_{pid}').format({ pid: process.pid });
    dirname = dirname || path.resolve(__dirname, '..', 'logs');
    auditFile = path.resolve(
      dirname,
      (auditFile || 'audit.{pid}.json').format({ pid: process.pid }),
    );

    // 建立 Logger 實體
    this.logger = createLogger({
      transports: [
        new transports.DailyRotateFile({
          ...this.loggerConfig,
          dirname,
          filename,
          auditFile,
          format: format.printf(({ level, message, ...meta }) =>
            JSON.stringify(meta),
          ),
        }),
      ],
    });
  }

  /** 寫入 Log */
  log(logEntry: LogEntry) {
    this.logger?.log({
      Level: LogStatus.Info,
      ExecuteTime: 0,
      Input: `${uuid()}#${Date.now()}`,
      Output: {},
      ...logEntry,
    });
  }
}
