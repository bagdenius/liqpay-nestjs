/**
 * __EN:__ Payment status
 *
 * __UK:__ Статус платежу
 */
export type LiqPayPaymentStatus =
  | LiqPayResolvedPaymentStatus
  | LiqPayUnresolvedPaymentStatus
  | LiqPayOtherPaymentStatus;

/**
 * __EN:__ Final payment statuses:
 * - `error` - Unsuccessful payment. Incorrectly filled data
 * - `failure` - Unsuccessful payment
 * - `reversed` - Payment reversed
 * - `subscribed` - Subscription successfully completed
 * - `success` - Successful payment
 * - `unsubscribed` - Subscription successfully deactivated
 *
 * __UK:__ Кінцеві статуси платежу:
 * - `error` - Неуспішний платіж. Некоректно заповнені дані
 * - `failure` - Неуспішний платіж
 * - `reversed` - Платіж повернений
 * - `subscribed` - Підписка успішно оформлена
 * - `success` - Успішний платіж
 * - `unsubscribed` - Підписка успішно деактивована
 */
export type LiqPayResolvedPaymentStatus =
  | 'error'
  | 'failure'
  | 'reversed'
  | 'subscribed'
  | 'success'
  | 'unsubscribed';

/**
 * __EN:__ Statuses that require payment confirmation:
 * - `3ds_verify` - __3DS__ verification is required. To complete the payment, you need to perform `3ds_verify`
 * - `captcha_verify` - __captcha__ confirmation is awaited
 * - `cvv_verify` - __CVV__ of the sender's card is required. To complete the payment, you need to perform `cvv_verify`
 * - `ivr_verify` - __ivr__ call confirmation is awaited
 * - `otp_verify` - __OTP__ client confirmation is required. OTP password has been sent to the Client's phone number. To complete the payment, you need to perform `otp_verify`
 * - `password_verify` - __Privat24__ application password confirmation is awaited
 * - `phone_verify` - __phone__ input is awaited by the client. To complete the payment, you need to execute `phone_verify`
 * - `pin_verify` - Waiting for confirmation of __pin-code__
 * - `receiver_verify` - You need to enter __recipient data__. To complete the payment, you need to execute `receiver_verify`
 * - `sender_verify` - You need to enter __sender data__. To complete the payment, you need to execute `sender_verify`
 * - `senderapp_verify` - Waiting for confirmation in the __Privat24__ application
 * - `wait_qr` - Waiting for the client to scan the __QR-code__
 * - `wait_sender` - Waiting for payment completion in __Privat24/SENDER__ applcation
 * - `p24_verify` - Waiting for payment completion in __Privat24__
 * - `mp_verify` - Waiting for payment completion in the __MasterPass__ wallet
 *
 * __UK:__ Статуси що потребують підтвердження платежу:
 * - `3ds_verify` - Потрібна __3DS__ верифікація. Для завершення платежу, потрібно виконати `3ds_verify`
 * - `captcha_verify` - Очікується підтвердження __captcha__
 * - `cvv_verify` - Потрібне введення __CVV__ картки відправника. Для завершення платежу, потрібно виконати `cvv_verify`
 * - `ivr_verify` - Очікується підтвердження дзвінком __ivr__
 * - `otp_verify` - Потрібне __OTP__ підтвердження клієнта. OTP пароль відправлений на номер телефону Клієнта. Для завершення платежу, потрібно виконати `otp_verify`
 * - `password_verify` - Очікується підтвердження пароля додатка __Приват24__
 * - `phone_verify` - Очікується введення __телефону__ клієнтом. Для завершення платежу, потрібно виконати `phone_verify`
 * - `pin_verify` - Очікується підтвердження __pin-code__
 * - `receiver_verify` - Потрібне введення __даних одержувача__. Для завершення платежу, потрібно виконати `receiver_verify`
 * - `sender_verify` - Потрібне введення __даних відправника__. Для завершення платежу, потрібно виконати `sender_verify`
 * - `senderapp_verify` - Очікується підтвердження в додатку __Privat24__
 * - `wait_qr` - Очікується сканування __QR-коду__ клієнтом
 * - `wait_sender ` - Очікується підтвердження оплати клієнтом в додатку __Privat24/SENDER__
 * - `p24_verify` - Очікується завершення платежу в __Приват24__
 * - `mp_verify` - Очікується завершення платежу в гаманці __MasterPass__
 */
export type LiqPayUnresolvedPaymentStatus =
  | '3ds_verify'
  | 'captcha_verify'
  | 'cvv_verify'
  | 'ivr_verify'
  | 'otp_verify'
  | 'password_verify'
  | 'phone_verify'
  | 'pin_verify'
  | 'receiver_verify'
  | 'sender_verify'
  | 'senderapp_verify'
  | 'wait_qr'
  | 'wait_sender'
  | 'p24_verify'
  | 'mp_verify';

/**
 * __EN:__ Other payment statuses
 * - `cash_wait` - Cash payment is expected at TSO
 * - `hold_wait` - The amount has been successfully blocked on the sender's account
 * - `invoice_wait` - Invoice created successfully, payment is expected
 * - `prepared` - Payment created, it is expected to be completed by the sender
 * - `processing` - Payment is being processed
 * - `wait_accept` - Funds have been debited from the client, but the store has not yet passed verification. If the store is not activated within 60 days, payments will be automatically canceled
 * - `wait_card` - No compensation method is set for the recipient
 * - `wait_compensation` - Payment is successful, will be credited in the daily posting
 * - `wait_lc` - Letter of credit. The customer has been charged, awaiting confirmation of delivery
 * - `wait_reserve` - The payment funds are reserved for a refund on a previously submitted request
 * - `wait_secure` - Payment is pending
 * - `try_again` - The payment was unsuccessful. The customer can try again
 *
 * __UK:__ Інші статуси платежу
 * - `cash_wait` - Очікується оплата готівкою в ТСО
 * - `hold_wait` - Сума успішно заблокована на рахунку відправника
 * - `invoice_wait` - Інвойс створений успішно, очікується оплата
 * - `prepared` - Платіж створений, очікується його завершення відправником
 * - `processing` - Платіж обробляється
 * - `wait_accept` - Кошти з клієнта списані, але магазин ще не пройшов перевірку. Якщо магазин не пройде активацію протягом 60 днів, платежі будуть автоматично скасовані
 * - `wait_card` - Не встановлений спосіб відшкодування у одержувача
 * - `wait_compensation` - Платіж успішний, буде зарахований в щодобовій проводці
 * - `wait_lc` - Акредитив. Кошти з клієнта списані, очікується підтвердження доставки товару
 * - `wait_reserve` - Грошові кошти за платежем зарезервовані для проведення повернення за раніше поданою заявкою
 * - `wait_secure` - Платіж на перевірці
 * - `try_again` - Оплата неуспішна. Клієнт може повторити спробу ще раз
 */
export type LiqPayOtherPaymentStatus =
  | 'cash_wait'
  | 'hold_wait'
  | 'invoice_wait'
  | 'prepared'
  | 'processing'
  | 'wait_accept'
  | 'wait_card'
  | 'wait_compensation'
  | 'wait_lc'
  | 'wait_reserve'
  | 'wait_secure'
  | 'try_again';
