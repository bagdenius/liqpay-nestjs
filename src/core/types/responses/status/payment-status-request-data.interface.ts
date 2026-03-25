import type { LiqPayBaseParams } from '../../common';

/**
 * __EN:__ API parameter data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 *
 * __UK:__ Дані параметрів API, які передаються при формуванні запиту на отримання статусу оплати як data у закодованому `base64` строковому вигляді при виклику API LiqPay
 */
export interface LiqPayPaymentStatusRequestData extends LiqPayBaseParams {
  /**
   * __EN:__ Operation type. Possible values: `status`
   *
   * __UK:__ Тип операції. Можливі значення: `status`
   */
  action: 'status';

  /**
   * __EN:__ Unique purchase ID in your store. Maximum length __255__ characters
   *
   * __UK:__ Унікальний ID покупки у Вашому магазині. Максимальна довжина __255__ символів
   */
  order_id: string;
}
