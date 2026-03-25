/**
 * __EN:__ Transaction type. Possible values:
 * - `pay` - payment
 * - `hold` - blocking funds on the sender's account
 * - `paysplit` - splitting the payment
 * - `subscribe` - creating a regular payment
 * - `paydonate` - donation
 * - `auth` - card pre-authorization
 * - `regular` - regular payment
 * - `status` - check payment status
 *
 * __UK:__ Тип операції. Можливі значення:
 * - `pay` - платіж
 * - `hold` - блокування коштів на рахунку відправника
 * - `paysplit` - розщеплення платежу
 * - `subscribe` - створення регулярного платежу
 * - `paydonate` - пожертвування
 * - `auth` - предавторизація картки
 * - `regular` - регулярний платіж
 * - `status` - перевірка статусу платежу
 */
export type LiqPayAction =
  | 'pay'
  | 'hold'
  | 'paysplit'
  | 'subscribe'
  | 'paydonate'
  | 'auth'
  | 'regular'
  | 'status';
