import type { LiqPayPaymentCommisionPayer, LiqPayPaymentRroInfo } from '..';

/**
 * __EN:__ Payment splitting options
 *
 * __UK:__ Параметри розщеплення платежу
 */
export interface LiqPayPaymentSplitRule {
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
   * __EN:__ Total payment amount. For example: `5`, `7.34`
   *
   * __UK:__ Загальна сума платежу. Наприклад: `5`, `7.34`
   */
  amount: number;

  /**
   * __EN:__ Payer of the acquiring fee. Possible values: `sender`, `receiver`
   *
   * __UK:__ Платник еквайрингової комісії. Можливі значення: `sender`, `receiver`
   */
  commission_payer: LiqPayPaymentCommisionPayer;

  /**
   * __EN:__ API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
   *
   * __UK:__ URL API в Вашому магазині для повідомлень про зміну статусу платежу (`сервер -> сервер`). Максимальна довжина __510__ символів.
   */
  server_url: string;

  /**
   * __EN:__ Data on fiscalization of payments for each recipient
   *
   * __UK:__ Дані по фіскалізації платжів по кожному одержувачу
   */
  rro_info?: LiqPayPaymentRroInfo;
}
