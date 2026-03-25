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
 * - `masterpass` - en: through the masterpass account, uk :через кабінет masterpass
 * - `paypart` - en: payment in parts, uk: оплата частинами
 * - `cash` - en: cash, uk: готівкою
 * - `invoice` - en: invoice to e-mail, uk: рахунок на e-mail
 * - `qr` - en: scanning a QR code, uk: сканування QR-коду
 */
export type LiqPayPaymentMethod =
  | 'apay'
  | 'gpay'
  | 'card'
  | 'privat24'
  | 'masterpass'
  | 'moment_part'
  | 'paypart'
  | 'cash'
  | 'invoice'
  | 'qr';
