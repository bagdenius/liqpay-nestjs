import type { LiqPayAction } from '..';
import type { LiqPayBaseParams, LiqPayOrderParams } from '.';

export interface LiqPayMainParams extends LiqPayBaseParams, LiqPayOrderParams {
  /**
   * __EN:__ Operation type.
   * __UK:__ Тип операції.
   *
   * Possible values:
   * - `pay` - en: payment, uk: платіж
   * - `hold` - en: blocking of funds on sender's account, uk: блокування коштів на рахунку відправника
   * - `subscribe` - en: regular payment, uk: регулярний платіж
   * - `paydonate` - en: donation, uk: пожертва
   */
  action: LiqPayAction;
}
