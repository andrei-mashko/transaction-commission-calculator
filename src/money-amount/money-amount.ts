import * as numeral from 'numeral';
import * as R from 'ramda';

export class MoneyAmount {
  static of = (input: any): MoneyAmount => new MoneyAmount(input);
  static isMoneyAmount = (value: any): boolean => value instanceof MoneyAmount;
  static getMin = (amounts: MoneyAmount[]): MoneyAmount => {
    const value = (amount: MoneyAmount) => amount.value();
    return R.reduce(R.minBy(value), MoneyAmount.of(Infinity), amounts);
  };
  private static ofNumeral = (nm: numeral.Numeral) =>
    MoneyAmount.of(nm.value());
  private static copyNumeral = (nm: numeral.Numeral) => numeral(nm.value());

  private readonly numeral: numeral.Numeral;
  private defaultScale = 2;

  constructor(input: any) {
    this.numeral = numeral(input);
  }

  public value(): number {
    return this.numeral.value();
  }
  public input(): any {
    return this.numeral.input();
  }
  public add(value: any): MoneyAmount {
    return this.updateAmount('add', value);
  }
  public multiply(value: any): MoneyAmount {
    return this.updateAmount('multiply', value);
  }
  public divide(value: any): MoneyAmount {
    return this.updateAmount('divide', value);
  }
  public isBiggerOrEqualThan(amount: MoneyAmount): boolean {
    return this.value() >= amount.value();
  }
  public toFixed(scale?: number): MoneyAmount {
    return MoneyAmount.of(this.value().toFixed(scale ?? this.defaultScale));
  }
  public toFixedString(scale?: number): string {
    return this.value().toFixed(scale ?? this.defaultScale);
  }

  private updateAmount(
    operation: 'add' | 'multiply' | 'divide',
    value: any,
  ): MoneyAmount {
    return MoneyAmount.ofNumeral(
      MoneyAmount.copyNumeral(this.numeral)[operation](value),
    );
  }
}
