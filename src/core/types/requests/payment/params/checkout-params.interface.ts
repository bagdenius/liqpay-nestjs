import type { LiqPayLanguage } from '../../../common';

export interface LiqPayCheckoutParams {
  /**
   * __EN:__ Client language: `uk`, `en`
   *
   * __UK:__ Мова клієнта: `uk`, `en`
   */
  language?: LiqPayLanguage;

  /**
   * __EN:__ Parameter that transmits payment methods to be displayed at checkout.
   * If the parameter is not provided, the store settings are applied.
   *
   * __UK:__ Параметр, в якому передаються способи оплати для відображення на чекауті.
   * Якщо параметр не переданий, застосовуються налаштування магазину.
   *
   * Possible values:
   * - `apay` - en: Apple Pay, uk: оплата за допомогою Apple Pay
   * - `gpay` - en: Google Pay, uk: оплата за допомогою Google Pay
   * - `card` - en: card payment, uk: оплата карткою
   * - `privat24` - en: via Privat24 account, uk: через кабінет Privat24
   * - `moment_part` - en: installments, uk: розстрочка
   * - `paypart` - en: payment in parts, uk: оплата частинами
   * - `cash` - en: cash, uk: готівкою
   * - `invoice` - en: invoice to e-mail, uk: рахунок на e-mail
   * - `qr` - en: scanning a QR code, uk: сканування QR-коду
   */
  paytypes?: string;

  /**
   * __EN:__ The URL in your store to which the buyer will be redirected after completing the purchase. Maximum length __510__ characters
   *
   * __UK__: URL у Вашому магазині на який покупця буде переадресовано після завершення покупки. Максимальна довжина __510__ символів
   */
  result_url?: string;

  /**
   * __EN:__ API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
   *
   * __UK:__ URL API в Вашому магазині для повідомлень про зміну статусу платежу (`сервер -> сервер`). Максимальна довжина __510__ символів.
   */
  server_url?: string;
}
