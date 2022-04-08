import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsInt, IsString } from 'class-validator';
import { CURRENCY } from 'src/common/interfaces/currency';
import { IsMoneyAmount } from 'src/money-amount/decorators/validator';
import { MoneyAmount } from 'src/money-amount/money-amount';

export class CalculateCommissionRequestDto {
  @ApiProperty({ example: '2021-01-01' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '100.00', type: String })
  @Transform(({ value }) => new MoneyAmount(value))
  @IsMoneyAmount()
  amount: MoneyAmount;

  @ApiProperty({ example: 'EUR' })
  @IsString()
  currency: CURRENCY;

  @ApiProperty({ example: 42, name: 'client_id' })
  @Expose({ name: 'client_id' })
  @IsInt({ message: 'client_id must be an integer number' })
  clientId: number;
}

export class CalculateCommissionResponseDto {
  @ApiProperty({ example: '100.00' })
  amount: string;

  @ApiProperty({ example: 'EUR', type: 'EUR' })
  currency: CURRENCY;
}
