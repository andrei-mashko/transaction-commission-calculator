import { registerDecorator, ValidationOptions } from 'class-validator';
import { MoneyAmount } from '../money-amount';

export function IsMoneyAmount(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsMoneyAmount',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `"${propertyName}" is not valid money amount`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return (
            MoneyAmount.isMoneyAmount(value) &&
            Number.isFinite(Number(value.input()))
          );
        },
      },
    });
  };
}
