import type { LiqPayAction, LiqPayCurrency, LiqPayPaymentRroInfo } from '..';

export interface LiqPayMainParams {
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

  /**
   * __EN:__ Payment amount. For example: `5`, `7.34`
   *
   * __UK:__ Сума платежу. Наприклад: `5`, `7.34`
   */
  amount: number;

  /**
   * __EN:__ Payment currency. Possible values: `USD`, `EUR`, `UAH`
   *
   * __UK:__ Валюта платежу. Можливі значення: `USD`, `EUR`, `UAH`
   */
  currency: LiqPayCurrency;

  /**
   * __EN:__ Payment purpose
   *
   * __UK:__ Призначення платежу
   */
  description: string;

  /**
   * __EN:__ Unique purchase ID in your store. Maximum length __255__ characters
   *
   * __UK:__ Унікальний ID покупки у Вашому магазині. Максимальна довжина __255__ символів
   */
  order_id: string;

  /**
   * __EN:__ Data for fiscalization
   *
   * __UK:__ Дані для фіскалізації
   */
  rro_info?: LiqPayPaymentRroInfo;

  /**
   * __EN:__ The time by which the customer can pay the invoice in `UTC`. Transmitted in the format `2016-04-24 00:00:00`
   *
   * __UK:__ Час до якого клієнт може оплатити рахунок за `UTC`. Передається в форматі `2016-04-24 00:00:00`
   */
  expired_date?: string;
}
