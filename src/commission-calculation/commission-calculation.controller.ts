import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ApiResponseWithExamples } from 'src/common/decorators/swagger';
import { AppError, GET_ERROR_BODY_FN } from 'src/common/errors';

import { CommissionCalculationService } from './commission-calculation.service';
import {
  CalculateCommissionRequestDto,
  CalculateCommissionResponseDto,
} from './dto/calculateCommission.dto';

@ApiTags('Commission calculation')
@Controller('commission-calculation')
export class CommissionCalculationController {
  constructor(
    private readonly commissionCalculationService: CommissionCalculationService,
  ) {}

  @ApiResponseWithExamples(400, [
    {
      title: GET_ERROR_BODY_FN.NOT_SUPPORTED_CURRENCY('NEW_USD').code,
      value: new AppError([
        GET_ERROR_BODY_FN.NOT_SUPPORTED_CURRENCY('NEW_USD'),
      ]).getApplicationErrorBody(),
    },
    {
      title: GET_ERROR_BODY_FN.NO_APPLIED_COMMISSION_CALCULATION_RULES().code,
      value: new AppError([
        GET_ERROR_BODY_FN.NO_APPLIED_COMMISSION_CALCULATION_RULES(),
      ]).getApplicationErrorBody(),
    },
  ])
  @ApiResponseWithExamples(500, [
    {
      title: 'InternalServerError',
      value: { statusCode: 500, message: 'Internal server error' },
    },
  ])
  @ApiOkResponse({ type: CalculateCommissionResponseDto })
  @HttpCode(200)
  @Post()
  async calculateCommission(
    @Body() body: CalculateCommissionRequestDto,
  ): Promise<CalculateCommissionResponseDto> {
    return await this.commissionCalculationService.calculateCommission(body);
  }
}
