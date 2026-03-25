import type {
  LiqPayAction,
  LiqPayLanguage,
  LiqPayMpiEci,
  LiqPayPaymentMethod,
  LiqPayPaymentStatus,
} from '../../common';
import type { LiqPayBonusType } from './bonus-type.type';
import type { LiqPayResult } from './result.type';

/**
 * __EN:__ API parameters that come in response to a request to get payment status
 *
 * __UK:__ Параметри API, що приходять у відповіді на запит отримання статусу платежу
 */
export interface LiqPayPaymentStatusResponse {
  /**
   * __EN:__ Acquirer ID
   *
   * __UK:__ ID еквайера
   */
  acq_id: number;

  /**
   * __EN:__ Transaction type. Possible values:
   * - `pay` - payment
   * - `hold` - blocking funds on the sender's account
   * - `paysplit` - splitting the payment
   * - `subscribe` - creating a regular payment
   * - `paydonate` - donation
   * - `auth` - card pre-authorization
   * - `regular` - regular payment
   *
   * __UK:__ Тип операції. Можливі значення:
   * - `pay` - платіж
   * - `hold` - блокування коштів на рахунку відправника
   * - `paysplit` - розщеплення платежу
   * - `subscribe` - створення регулярного платежу
   * - `paydonate` - пожертвування
   * - `auth` - предавторизація картки
   * - `regular` - регулярний платіж
   */
  action: LiqPayAction;

  /**
   * __EN:__ Agent commission in payment currency
   *
   * __UK:__ Комісія агента в валюті платежу
   */
  agent_commission: number;

  /**
   * __EN:__ Payment amount
   *
   * __UK:__ Сума платежу
   */
  amount: number;

  /**
   * __EN:__ Sender bonus in debit payment currency
   *
   * __UK:__ Бонус відправника у валюті платежу debit
   */
  amount_bonus: number;

  /**
   * __EN:__ Transaction amount credit in currency `currency_credit`
   *
   * __UK:__ Сума транзакції credit в валюті `currency_credit`
   */
  amount_credit: number;

  /**
   * __EN:__ Amount of debit transaction in currency `currency_debit`
   *
   * __UK:__ Сума транзакції debit у валюті `currency_debit`
   */
  amount_debit: number;

  /**
   * __EN:__ Authorization code for credit transaction
   *
   * __UK:__ Код авторизації по транзакції credit
   */
  authcode_credit: string;

  /**
   * __EN:__ Authorization code for debit transaction
   *
   * __UK:__ Код авторизації по транзакції debit
   */
  authcode_debit: string;

  /**
   * __EN:__ Discount amount in percentage
   *
   * __UK:__ Розмір знижки в процентах
   */
  bonus_procent: number;

  /**
   * __EN:__ Bonus type, possible values: `bonusplus`, `discount_club`, `personal`, `promo`
   *
   * __UK:__ Тип бонусу, можливі значення: `bonusplus`, `discount_club`, `personal`, `promo`
   */
  bonus_type: LiqPayBonusType;

  /**
   * __EN:__ Sender card token
   *
   * __UK:__ Token картки відправника
   */
  card_token: string;

  /**
   * __EN:__ Recipient fee in `currency_credit` currency
   *
   * __UK:__ Комісія з одержувача у валюті `currency_credit`
   */
  commission_credit: number;

  /**
   * __EN:__ Sender fee in `currency_debit`
   *
   * __UK:__ Комісія з відправника у валюті `currency_debit`
   */
  commission_debit: number;

  /**
   * __EN:__ Payer's phone. An OTP payment confirmation password was sent to this number and the payer's LiqPay account was linked. The phone number is indicated in the international format (Ukraine `+380`). For example: +380950000001 (with +) or 380950000001 (without +)
   *
   * __UK:__ Телефон платника. На цей номер було відправлено OTP пароль підтвердження платежу та підв‘язаний кабінет платника LiqPay. Телефон вказується в міжнародному форматі (Україна `+380`). Наприклад: +380950000001 (з +) або 380950000001 (без +)
   */
  confirm_phone: string;

  /**
   * __EN:__ Payment creation date
   *
   * __UK:__ Дата створення платежу
   */
  create_date: string;

  /**
   * __EN:__ Payment currency
   *
   * __UK:__ Валюта платежу
   */
  currency: string;

  /**
   * __EN:__ Transaction currency credit
   *
   * __UK:__ Валюта транзакції credit
   */
  currency_credit: string;

  /**
   * __EN:__ Transaction currency debit
   *
   * __UK:__ Валюта транзакції debit
   */
  currency_debit: string;

  /**
   * __EN:__ Payment comment
   *
   * __UK:__ Коментар до платежу
   */
  description: string;

  /**
   * __EN:__ Payment completion/change date
   *
   * __UK:__ Дата завершення/зміни платежу
   */
  end_date: string;

  /**
   * __EN:__ Additional payment information
   *
   * __UK:__ Додаткова інформація про платіж
   */
  info: string;

  /**
   * __EN:__ Sender IP address
   *
   * __UK:__ IP адреса відправника
   */
  ip: string;

  /**
   * __EN:__ Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
   *
   * __UK:__ Можливі значення: `true` - транзакція пройшла з 3DS перевіркою, `false` - транзакція пройшла без 3DS перевірки
   */
  is_3ds: boolean;

  /**
   * __EN:__ Client language: `uk`, `en`
   *
   * __UK:__ Мова клієнта: `uk`, `en`
   */
  language: LiqPayLanguage;

  /**
   * __EN:__ `Order_id` of payment in the LiqPay system
   *
   * __UK:__ `Order_id` платежу в системі LiqPay
   */
  liqpay_order_id: string;

  /**
   * __EN:__ Payment in installments sign
   *
   * __UK:__ Ознака оплати частинами
   */
  moment_part: string;

  /**
   * __EN:__ Possible values:
   * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
   * - `6` - the payer's card issuer does not support 3D-Secure technology
   * - `7` - the transaction was completed without 3D-Secure
   *
   * __UK:__ Можливі значення:
   * - `5` - транзакція пройшла з 3DS (емітент і еквайєр підтримують технологію 3D-Secure)
   * - `6` - емітент картки платника не підтримує технологію 3D-Secure
   * - `7` - операція пройшла без 3D-Secure
   */
  mpi_eci: LiqPayMpiEci;

  /**
   * __EN:__ Payment `Order_id`
   *
   * __UK:__ `Order_id` платежу
   */
  order_id: string;

  /**
   * __EN:__ Payment ID in the LiqPay system
   *
   * __UK:__ Id платежу в системі LiqPay
   */
  payment_id: number;

  /**
   * __EN:__ Payment method. Possible values:
   * - card - payment by card
   * - privat24 - through the Privat24 account
   * - moment_part - installment
   * - invoice - invoice to e-mail
   * - qr - scan qr code
   *
   * __UK:__ Спосіб оплати. Можливі значення:
   * - card - оплата картою
   * - privat24 - через кабінет Приват24
   * - moment_part - розстрочка
   * - invoice - рахунок на e-mail
   * - qr - сканування qr-коду
   */
  paytype: LiqPayPaymentMethod;

  /**
   * __EN:__ Store public key
   *
   * __UK:__ Публічний ключ магазину
   */
  public_key: string;

  /**
   * __EN:__ Recipient fee in payment currency
   *
   * __UK:__ Комісія з одержувача у валюті платежу
   */
  receiver_commission: number;

  /**
   * __EN:__ Result of query execution: `ok`, `error`
   *
   * __UK:__ Результат виконання запиту: `ok`, `error`
   */
  result: LiqPayResult;

  /**
   * __EN:__ Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
   *
   * __UK:__ Унікальний номер транзакції в системі авторизації і розрахунків обслуговуючого банку `Retrieval Reference number`
   */
  rrn_credit: string;

  /**
   * __EN:__ Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
   *
   * __UK:__ Унікальний номер транзакції в системі авторизації і розрахунків обслуговуючого банку `Retrieval Reference number`
   */
  rrn_debit: string;

  /**
   * __EN:__ Sender bonus in payment currency
   *
   * __UK:__ Бонус відправника у валюті платежу
   */
  sender_bonus: number;

  /**
   * __EN:__ Sender's bank
   *
   * __UK:__ Банк відправника
   */
  sender_card_bank: string;

  /**
   * __EN:__ Country of the sender's card. Numeric __ISO 3166-1__ code
   *
   * __UK:__ Країна картки відправника. Цифровий __ISO 3166-1__ код
   */
  sender_card_country: string;

  /**
   * __EN:__ Sender's card
   *
   * __UK:__ Карта відправника
   */
  sender_card_mask2: string;

  /**
   * __EN:__ Sender's IBAN
   *
   * __UK:__ IBAN відправника
   */
  sender_iban: string;

  /**
   * __EN:__ Sender's card type MC/Visa
   *
   * __UK:__ Тип картки відправника MC/Visa
   */
  sender_card_type: string;

  /**
   * __EN:__ Sender's fee in payment currency
   *
   * __UK:__ Комісія з відправника у валюті платежу
   */
  sender_commission: number;

  /**
   * __EN:__ Sender's first name
   *
   * __UK:__ Ім'я відправника
   */
  sender_first_name: string;

  /**
   * __EN:__ Sender's last name
   *
   * __UK:__ Прізвище відправника
   */
  sender_last_name: string;

  /**
   * __EN:__ Sender's phone number
   *
   * __UK:__ Телефон відправника
   */
  sender_phone: string;

  /**
   * __EN:__ Payment status
   *
   * __UK:__ Статус платежу
   */
  status: LiqPayPaymentStatus;

  /**
   * __EN:__ An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
   *
   * __UK:__ Додатковий статус платежу, який говорить про те, що поточний платіж зарезервовано для виконання повернення по вашому магазину. Можливі значення: `true` - платіж зарезервовано для виконання повернення
   */
  wait_reserve_status: string;

  /**
   * __EN:__ Transaction ID in the LiqPay system
   *
   * __UK:__ Id транзакції в системі LiqPay
   */
  transaction_id: number;

  /**
   * __EN:__ Payment type
   *
   * __UK:__ Тип платежу
   */
  type: string;

  /**
   * __EN:__ API version. Current value is `7`
   *
   * __UK:__ Версія API. Поточне значення - `7`
   */
  version: number;
}
