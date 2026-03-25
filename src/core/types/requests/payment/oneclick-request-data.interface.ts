import type { LiqPayOneClickParams } from '../params';
import type { LiqPayPayRequestData } from '.';

export interface LiqPayOneClickRequestData
  extends LiqPayPayRequestData, Required<LiqPayOneClickParams> {
  action: 'pay';
}
