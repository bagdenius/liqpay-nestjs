import type { LiqPayPaymentRroInfo } from '..';

export interface LiqPayAdvancedParams {
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

  /**
   * __EN:__ Possible value `Y`. Dynamic verification code, generated and returned in `Callback`. Similarly, the generated code will be passed in the verification transaction to be displayed in the client's card statement. Works for `action = auth`
   *
   * __UK:__ Можливе значення `Y`. Динамічний код верифікації, генерується і повертається в `Callback`. Так само згенерований код буде переданий в транзакції верифікації для відображення у виписці по картці клієнта. Працює для `action = auth`
   */
  verifycode?: string;

  /**
   * __EN:__ Payment with splitting the amount into several recipients. This parameter specifies a `JSON` array with payment splitting rules.
   * One debit is made from the client and several credits are made to the recipients. If you need to transfer your purpose for each amount, use the `description` parameter.
   * If you need to fiscalize payments for each recipient, add the `rro_info` object. The acquiring fee is charged for each recipient.
   *
   * __UK:__ Платіж з розщепленням суми на декількох одержувачів. У цьому параметрі вказується `JSON` масив з правилами розщеплення платежу.
   * Відбувається одне списання з клієнта і кілька зарахувань одержувачам. Якщо потрібно передавати своє призначення по кожній сумі, використовуйте параметр `description`.
   * Якщо необхідно фіскалізувати платежі по кожному одержувачу, додайте об'єкт `rro_info`. Еквайрингова комісія стягується з кожного одержувача.
   *
   * @example
   * ```json
   * [
   *   {
   *     "public_key": "i000000001",
   *     "amount": 404,
   *     "commission_payer": "sender",
   *     "server_url": "https://server1/callback",
   *     "rro_info": {
   *       "items": [
   *         {
   *           "amount": 2, // en: quantity, uk: кількість
   *           "price": 202, // en: unit price, uk: вартість одиниці
   *           "cost": 404, // en: total cost, uk: вартість всіх одиниць
   *           "id": 123456 // en: product id, uk: ідентифікатор товару
   *         }
   *       ],
   *       "delivery_emails": [
   *         "email1@email.com",
   *         "email2@email.com"
   *       ]
   *     }
   *   },
   *   {
   *     "public_key": "i000000002",
   *     "amount": 200,
   *     "commission_payer": "receiver",
   *     "server_url": "https://server2/callback"
   *   }
   * ]
   * ```
   */
  split_rules?: string;

  // OTHER PARAMS
  // ІНШІ ПАРАМЕТРИ

  /**
   * __EN:__ Long Detail Addenda entry. __Required for merchants with MCC 4511__.
   *
   * The `dae` parameter is a `JSON` string to which `base64` has been applied.
   * It can contain the parameters given in the example below.
   *
   * __UK:__ Довгий запис Detail Addenda. __Обов'язковий для мерчантів з МСС 4511__.
   *
   * Параметр `dae` являє собою `JSON` рядок, до якого застосували функцію `base64`.
   * JSON може містити параметри, наведені у прикладі нижче.
   *
   * @example
   * ```json
   * {
   *   // en: airline abbreviation, max 4 characters.
   *   // uk: абревіатура авіакомпанії, max 4 символів.
   *   "airLine": "Avia",
   *
   *   // en: reservation number (locator), max 15 characters.
   *   // uk: номер бронювання (локатор), max 15 символів.
   *   "ticketNumber": "ACSFD12354SA",
   *
   *   // en: passenger name, max 29 characters.
   *   // uk: ім'я пасажира, max 29 символів.
   *   "passengerName": "John Doe",
   *
   *   // en: flight number, max 5 digits.
   *   // uk: номер рейсу, max 5 цифр.
   *   "flightNumber": "742",
   *
   *   // en: departure city/airport code, max 5 characters.
   *   // uk: код міста/аеропорту вильоту, max 5 символів.
   *   "originCity": "DP",
   *
   *   // en: destination city/airport code, max 5 characters.
   *   // uk: код міста/аеропорту призначення, max 5 символів.
   *   "destinationCity": "NY",
   *
   *   // en: departure date in YYMMDD format, max 6 digits.
   *   // uk: дата вильоту в форматі YYMMDD, max 6 цифр.
   *   "departureDate": "100514"
   * }
   * ```
   */
  dae?: string;
}
