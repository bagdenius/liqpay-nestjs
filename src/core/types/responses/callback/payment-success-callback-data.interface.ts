import type { LiqPayProductParams } from '../../common';
import type {
  LiqPayAmountParams,
  LiqPayBonusParams,
  LiqPayCallbackBaseParams,
  LiqPayCommissionParams,
  LiqPayPaymentDetailsParams,
  LiqPayReserveParams,
  LiqPaySenderParams,
  LiqPayTechnicalParams,
  LiqPayTransactionParams,
} from './params';

export interface LiqPaySuccessCallbackData
  extends
    LiqPayCallbackBaseParams,
    LiqPayTechnicalParams,
    LiqPayPaymentDetailsParams,
    LiqPayTransactionParams,
    LiqPaySenderParams,
    LiqPayCommissionParams,
    LiqPayAmountParams,
    LiqPayProductParams,
    LiqPayBonusParams,
    LiqPayReserveParams {
  status: 'success';
}
