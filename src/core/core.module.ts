import { ConfigModule } from '.';
import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { BullConfig, ConfigType } from 'src/models';
import { v4 as uuid } from 'uuid';
import { ConfigService } from './config';
import * as IORedis from 'ioredis';

@Global()
@Module({
  imports: [
    // 註冊 ConfigModule
    ConfigModule,
    // 註冊 BullModule
    BullModule.registerQueueAsync({
      name: 'logger',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // 讀取 BullConfig
        const { options } = config.get<BullConfig>(ConfigType.Bull);

        // 如果有提供 Redis Cluster 則自定 Redis Client
        // let createClient: (
        //   type: string,
        //   redisOpts: IORedis.RedisOptions,
        // ) => IORedis.Cluster;
        // if (Array.isArray(clusterNodes) && clusterNodes.length > 0) {
        //   createClient = (type, redisOptions) =>
        //     new IORedis.Cluster(clusterNodes, {
        //       ...clusterOptions,
        //       redisOptions,
        //     });
        // }

        return {
          name: uuid(),
          prefix: `{${uuid()}}`,
          ...options,
          defaultJobOptions: {
            removeOnFail: true,
            removeOnComplete: true,
            ...options.defaultJobOptions,
          },
          //createClient,
        };
      },
    }),
  ],
  exports: [ConfigModule, BullModule],
})
export class CoreModule {}
