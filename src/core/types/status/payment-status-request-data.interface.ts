/**
 * __EN:__ API parameter data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 *
 * __UK:__ Дані параметрів API, які передаються при формуванні запиту на отримання статусу оплати як data у закодованому `base64` строковому вигляді при виклику API LiqPay
 */
export interface LiqPayPaymentStatusRequestData {
  /**
   * __EN:__ API version. Current version: `7`
   *
   * __UK:__ Версія API. Поточне значення: `7`
   */
  version: number;

  /**
   * __EN:__ Public API key: ID of created company. Example: `i00000000`
   *
   * You can get the key in the store settings.
   *
   * __UK:__ Публічний ключ - ідентифікатор створеної компанії. Наприклад: `i00000000`
   *
   * Отримати ключ можна в налаштуваннях магазину
   */
  public_key: string;

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
