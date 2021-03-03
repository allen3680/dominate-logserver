import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from './core';
import { ConfigType, ServerConfig } from './models';

@Injectable()
export class AppService {
  get serverConfig(): ServerConfig {
    return this.configService.get<ServerConfig>(ConfigType.Server);
  }

  constructor(private configService: ConfigService) {}

  async init(app: INestApplication): Promise<void> {
    if (!app) {
      return;
    }

    const { port, globalPrefix } = this.serverConfig;
    app.setGlobalPrefix(globalPrefix || '');
    await app.listen(process.env.PORT || port || 8120);
  }
}
