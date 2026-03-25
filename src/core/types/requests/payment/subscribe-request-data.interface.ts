import type { LiqPaySubscriptionParams } from './params';
import type { LiqPayBaseRequestData } from '.';

export interface LiqPaySubscribeRequestData
  extends LiqPayBaseRequestData, Required<LiqPaySubscriptionParams> {
  action: 'subscribe';
}
