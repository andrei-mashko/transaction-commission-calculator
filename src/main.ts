import './common/utils/tracing';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { config } from './common/config';
import { AppExceptionFilter } from './common/errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(PinoLogger));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Transaction commission calculation')
    .setDescription('The API to calculate commission of a client transaction')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.use(helmet());
  app.enableShutdownHooks();

  await app.listen(config.APP_PORT);
}
bootstrap();
