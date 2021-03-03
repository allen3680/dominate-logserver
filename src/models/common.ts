import { BullModuleOptions } from '@nestjs/bull';
import * as IORedis from 'ioredis';

/** 此處 ConfigType 的值，
 * 需對應 configs 資料夾內的 json 檔案名稱，
 * config 檔案命名規則：{file name}.config.json，
 * 如：server.config.json 則 ConfigType 應增加 server */
export enum ConfigType {
  Server = 'server',
  Logger = 'logger',
  Bull = 'bull',
}

/** Server 設定 */
export type ServerConfig = {
  port?: number;
  globalPrefix?: string;
  isHttps?: boolean;
  sslKey?: string;
  sslCert?: string;
};

export type BullConfig = {
  options?: BullModuleOptions;
  // clusterNodes?: IORedis.ClusterNode[];
  // clusterOptions?: IORedis.ClusterOptions;
  redisOptions?: IORedis.RedisOptions;
};

export enum LogStatus {
  Debug = 'Debug',
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error',
  Fatal = 'Fatal',
}
