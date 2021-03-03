import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { CoreModule } from './core/core.module';
import { ProcessorModule } from './processor/processor.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [CoreModule, ServiceModule, ControllerModule, ProcessorModule],
  providers: [AppService],
})
export class AppModule {}
