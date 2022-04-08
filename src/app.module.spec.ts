import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import {
  ConversionRatesProvider,
  CONVERSION_RATES_PROVIDER,
} from './currency-conversion/interfaces/conversion-rates-provider.interface';
import { CommissionCalculationHistoryRepository } from './commission-calculation/commission-calculation-history/commission-calculation-history.repository';
import { setupApp } from './main-setup-app';
import { MoneyAmount } from './money-amount/money-amount';

describe('App', () => {
  describe('/commission-calculation (POST)', () => {
    let app: INestApplication;
    let conversionRatesProvider: ConversionRatesProvider;
    let commissionCalculationHistoryRepository: CommissionCalculationHistoryRepository;

    beforeEach(async () => {
      jest.resetAllMocks();

      const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(CONVERSION_RATES_PROVIDER)
        .useValue({
          getCurrencyToRate: jest.fn().mockResolvedValue({ EUR: 1 }),
        })
        .overrideProvider(CommissionCalculationHistoryRepository)
        .useValue({
          saveTransaction: jest.fn(),
          getClientTransactionTotalAmountInRange: jest.fn(),
        })
        .compile();

      conversionRatesProvider = module.get<ConversionRatesProvider>(
        CONVERSION_RATES_PROVIDER,
      );
      commissionCalculationHistoryRepository =
        module.get<CommissionCalculationHistoryRepository>(
          CommissionCalculationHistoryRepository,
        );

      app = module.createNestApplication();
      setupApp(app);
      await app.init();
    });

    describe('Rule #1: Default pricing', () => {
      beforeEach(() => {
        jest
          .spyOn(
            commissionCalculationHistoryRepository,
            'getClientTransactionTotalAmountInRange',
          )
          .mockResolvedValue(MoneyAmount.of(100));
      });

      it('0.5% of amount when it is not less than 0.05€', async () => {
        const response = await request(app.getHttpServer())
          .post('/commission-calculation')
          .send({
            date: '2021-01-01',
            amount: '100.00',
            currency: 'EUR',
            client_id: 41,
          });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          amount: '0.50',
          currency: 'EUR',
        });
      });

      it('0.05€ when 0.5% of amount is less than 0.05€', async () => {
        const response = await request(app.getHttpServer())
          .post('/commission-calculation')
          .send({
            date: '2021-01-01',
            amount: '1',
            currency: 'EUR',
            client_id: 41,
          });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          amount: '0.05',
          currency: 'EUR',
        });
      });
    });

    describe('Rule #2: Client with a discount', () => {
      it('0.05€ for client with id 42 when it is lower amount among others rules', async () => {
        jest
          .spyOn(
            commissionCalculationHistoryRepository,
            'getClientTransactionTotalAmountInRange',
          )
          .mockResolvedValue(MoneyAmount.of(100));

        const response = await request(app.getHttpServer())
          .post('/commission-calculation')
          .send({
            date: '2021-01-01',
            amount: '100.00',
            currency: 'EUR',
            client_id: 42,
          });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          amount: '0.05',
          currency: 'EUR',
        });
      });

      it('lower amount among others rules for client with id 42 ', async () => {
        jest
          .spyOn(
            commissionCalculationHistoryRepository,
            'getClientTransactionTotalAmountInRange',
          )
          .mockResolvedValue(MoneyAmount.of(1000));

        const response = await request(app.getHttpServer())
          .post('/commission-calculation')
          .send({
            date: '2021-01-01',
            amount: '1',
            currency: 'EUR',
            client_id: 42,
          });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          amount: '0.03',
          currency: 'EUR',
        });
      });
    });

    describe('Rule #3: High turnover discount', () => {
      it('0.03€ for client with month turnover => 1000€', async () => {
        jest
          .spyOn(
            commissionCalculationHistoryRepository,
            'getClientTransactionTotalAmountInRange',
          )
          .mockResolvedValue(MoneyAmount.of(1000));

        const response = await request(app.getHttpServer())
          .post('/commission-calculation')
          .send({
            date: '2021-01-01',
            amount: '100.00',
            currency: 'EUR',
            client_id: 21,
          });

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          amount: '0.03',
          currency: 'EUR',
        });
      });
    });
  });
});
