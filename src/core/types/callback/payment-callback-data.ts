import type {
  LiqPayAction,
  LiqPayMpiEci,
  LiqPayPaymentMethod,
  LiqPayPaymentStatus,
} from '../common';

/**
 * __EN:__
 *
 * __UK:__ Розшифрований формат параметрів API, що приходять в запиті від LiqPay після оплати
 */
export interface LiqPayCallbackData {
  /**
   * __EN:__ Acquirer ID
   *
   * __UK:__ ID еквайера
   */
  acq_id: number;

  /**
   * __EN:__ Operation type. Possible values:
   * - `pay` - payment
   * - `hold` - blocking of funds on the sender's account
   * - `subscribe` - creation of a regular payment
   * - `regular` - regular payment
   *
   * __UK:__ Тип операції. Можливі значення:
   * - `pay` - платіж
   * - `hold` - блокування коштів на рахунку відправника
   * - `subscribe` - створення регулярного платежу
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
   * __EN:__ Transaction amount credit in currency `currency_credit`
   *
   * __UK:__ Сума транзакції credit в валюті `currency_credit`
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
   * __EN:__ Date of debiting funds
   *
   * __UK:__ Дата списання коштів
   */
  completion_date: string;

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
   * __EN:__ A unique user identifier on the merchant's website. Maximum length __100__ characters.
   *
   * __UK:__ Унікальний ідентифікатор користувача на сайті мерчанта. Максимальна довжина __100__ символів.
   */
  customer: string;

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
   * __EN:__ Error code
   *
   * __UK:__ Код помилки
   */
  err_code: string;

  /**
   * __EN:__ Error description
   *
   * __UK:__ Опис помилки
   */
  err_description: string;

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
   * __EN:__ `Order_id` of payment in the LiqPay system
   *
   * __UK:__ `Order_id` платежу в системі LiqPay
   */
  liqpay_order_id: string;

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
   * __EN:__ Link to which the client must be redirected to complete 3DS verification
   *
   * __UK:__ Посилання на яке необхідно перенаправляти клієнта для проходження 3DS верифікації
   */
  redirect_to: string;

  /**
   * __EN:__ Date of last payment refund
   *
   * __UK:__ Дата останнього повернення по платежу
   */
  refund_date_last: string;

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
   * __EN:__ Payment Token
   *
   * __UK:__ Token платежу
   */
  token: string;

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

  /**
   * __EN:__ Error code
   *
   * __UK:__ Код помилки
   */
  err_erc: string;

  /**
   * __EN:__ Product category
   *
   * __UK:__ Категорія товару
   */
  product_category: string;

  /**
   * __EN:__ Product description
   *
   * __UK:__ Опис товару
   */
  product_description: string;

  /**
   * __EN:__ Product name
   *
   * __UK:__ Назва товару
   */
  product_name: string;

  /**
   * __EN:__ Product page address
   *
   * __UK:__ Адреса сторінки з товаром
   */
  product_url: string;

  /**
   * __EN:__ Refund amount
   *
   * __UK:__ Сума повернення
   */
  refund_amount: number;

  /**
   * __EN:__ Verification code
   *
   * __UK:__ Код верифікації
   */
  verifycode: string;
}
