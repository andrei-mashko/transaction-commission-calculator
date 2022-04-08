import { CURRENCY } from '../interfaces/currency';

export class AppError extends Error {
  constructor(private readonly errors: Array<ErrorBody>) {
    super('ApplicationError');
  }

  getApplicationErrorBody() {
    return this.errors.reduce(
      (acc, { code, message }) => {
        return {
          errorCodes: [...acc.errorCodes, code],
          errorMessages: [...acc.errorMessages, message],
        };
      },
      { errorCodes: [], errorMessages: [] },
    );
  }
}

interface ErrorBody {
  code: string;
  message: string;
}

export const GET_ERROR_BODY_FN = {
  NOT_SUPPORTED_CURRENCY: (currency: CURRENCY) => ({
    code: 'ERR-1',
    message: `Currency "${currency}" is not supported`,
  }),
  NO_APPLIED_COMMISSION_CALCULATION_RULES: () => ({
    code: 'ERR-2',
    message: `No applied rules. Commission can not be calculated`,
  }),
};
