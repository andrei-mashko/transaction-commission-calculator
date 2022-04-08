import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';
import helmet from 'helmet';

import { AppExceptionFilter } from './common/errors';
import { INestApplication } from '@nestjs/common';

export const setupApp = (app: INestApplication) => {
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
};
