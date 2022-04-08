import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './app-error';

@Catch(AppError)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorBody = exception.getApplicationErrorBody();

    response.status(400).json(errorBody);
  }
}
