import { Test, TestingModule } from '@nestjs/testing';
import { GET_ERROR_BODY_FN } from 'src/common/errors';
import { MoneyAmount } from 'src/money-amount/money-amount';
import { CurrencyConversionService } from './currency-conversion.service';
import {
  ConversionRatesProvider,
  CONVERSION_RATES_PROVIDER,
} from './interfaces/conversion-rates-provider.interface';

describe('CurrencyConversionService', () => {
  let currencyConversionService: CurrencyConversionService;
  let conversionRatesProvider: ConversionRatesProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyConversionService,
        {
          provide: CONVERSION_RATES_PROVIDER,
          useValue: {
            getCurrencyToRate: jest.fn(),
          } as ConversionRatesProvider,
        },
      ],
    }).compile();

    currencyConversionService = module.get<CurrencyConversionService>(
      CurrencyConversionService,
    );
    conversionRatesProvider = module.get<ConversionRatesProvider>(
      CONVERSION_RATES_PROVIDER,
    );
  });

  it('should be defined', () => {
    expect(currencyConversionService).toBeDefined();
  });

  it('should throw error when there is no rate for conversion', async () => {
    jest
      .spyOn(conversionRatesProvider, 'getCurrencyToRate')
      .mockResolvedValue({ USD: 1.123 });

    const NOT_EXISTING_CURRENCY = 'NOT_EXISTING_CURRENCY';
    await expect(
      currencyConversionService.convert({
        amount: MoneyAmount.of(100),
        date: '2022-01-01',
        sourceCurrency: 'NOT_EXISTING_CURRENCY',
      }),
    ).rejects.toMatchObject({
      errors: [GET_ERROR_BODY_FN.NOT_SUPPORTED_CURRENCY(NOT_EXISTING_CURRENCY)],
    });
  });

  it('should convert according to conversion rate when it is provided', async () => {
    jest
      .spyOn(conversionRatesProvider, 'getCurrencyToRate')
      .mockResolvedValue({ USD: 1.123 });

    const convertedAmount = await currencyConversionService.convert({
      amount: MoneyAmount.of(100),
      date: '2022-01-01',
      sourceCurrency: 'USD',
    });

    expect(convertedAmount.value()).toEqual(89.05);
  });
});
