import './common/utils/tracing';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { config } from './common/config';
import { setupApp } from './main-setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  setupApp(app);
  await app.listen(config.APP_PORT);
}
bootstrap();
