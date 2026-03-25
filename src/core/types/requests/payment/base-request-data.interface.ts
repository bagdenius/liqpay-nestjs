import type { LiqPayMainParams } from '../../common';
import type {
  LiqPayAdvancedParams,
  LiqPayCheckoutParams,
  LiqPayProductParams,
  LiqPayRequestSenderParams,
} from '../params';

export interface LiqPayBaseRequestData
  extends
    LiqPayMainParams,
    LiqPayCheckoutParams,
    LiqPayRequestSenderParams,
    LiqPayProductParams,
    LiqPayAdvancedParams {}
