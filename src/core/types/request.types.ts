/**
 * __EN:__ API parameter data for calling LiqPay API
 *
 * __UK:__ Дані API параметрів для виклику LiqPay API
 */
export interface LiqPayRequestData {
  // MAIN PARAMS
  // ОСНОВНІ ПАРАМЕТРИ

  /**
   * __EN:__ API version. Current version: `7`
   *
   * __UK:__ Версія API. Поточне значення: `7`
   */
  version: number;

  /**
   * __EN:__ Operation type
   *
   * Possible values:
   * - `pay` - payment
   * - `hold` - blocking of funds on the sender's account
   * - `subscribe` - regular payment
   * - `paydonate` - donation
   *
   * __UK:__ Тип операції
   *
   * Можливі значення:
   * - `pay` - платіж,
   * - `hold` - блокування коштів на рахунку відправника
   * - `subscribe` - регулярний платіж
   * - `paydonate` - пожертва
   */
  action: LiqPayRequestAction;

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
  rro_info?: LiqPayRroInfo;

  /**
   * __EN:__ The time by which the customer can pay the invoice in `UTC`. Transmitted in the format `2016-04-24 00:00:00`
   *
   * __UK:__ Час до якого клієнт може оплатити рахунок за `UTC`. Передається в форматі `2016-04-24 00:00:00`
   */
  expired_date?: string;

  /**
   * __EN:__ Client language: `uk`, `en`
   *
   * __UK:__ Мова клієнта: `uk`, `en`
   */
  language?: LiqPayLanguage;

  /**
   * __EN:__ Parameter that transmits payment methods that will be displayed at checkout
   *
   * Possible values ​​are:
   * - `apay` - payment using Apple Pay
   * - `gpay` - payment using Google Pay
   * - `card` - payment by card
   * - `privat24` - through the privat24 account
   * - `moment_part` - installments
   * - `paypart` - payment in parts
   * - `cash` - cash
   * - `invoice` - invoice to e-mail
   * - `qr` - scanning a qr code
   *
   * If the parameter is not transmitted, the store settings are applied, the Checkout tab
   *
   * __UK:__ Параметр в якому передаються способи оплати, які будуть відображені на чекауті
   *
   * Можливі значення:
   * - `apay` - оплата за допомогою Apple Pay
   * - `gpay` - оплата за допомогою Google Pay
   * - `card` - оплата карткою
   * - `privat24` - через кабінет приват24
   * - `moment_part` - розстрочка
   * - `paypart` - оплата частинами
   * - `cash` - готівкою
   * - `invoice` - рахунок на e-mail
   * - `qr` - сканування qr-коду
   *
   * Якщо параметр не переданий, то застосовуються налаштування магазину, вкладка Checkout
   */
  paytypes?: LiqPayRequestPaytype;

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

  /**
   * __EN:__ Possible value `Y`. Dynamic verification code, generated and returned in `Callback`. Similarly, the generated code will be passed in the verification transaction to be displayed in the client's card statement. Works for `action = auth`
   *
   * __UK:__ Можливе значення `Y`. Динамічний код верифікації, генерується і повертається в `Callback`. Так само згенерований код буде переданий в транзакції верифікації для відображення у виписці по картці клієнта. Працює для `action = auth`
   */
  verifycode?: string;

  /**
   * __EN:__ Payment with splitting the amount into several recipients. This parameter specifies a `JSON` array with payment splitting rules. When using the `split_rules` parameter, one debit is made from the client and several credits are made to the recipients. If you need to transfer your purpose for each amount, use the `description` parameter.
   * 
   * If you need to fiscalize payments for each recipient, you should add the `rro_info` object. The acquiring fee is charged for each recipient in the `split_rules` array.
   * 
   * Example of a `JSON` line:
   * ```json
    [
      {
        "public_key": "i000000001",
        "amount": 404,
        "commission_payer": "sender",
        "server_url": "https://server1/callback",
        "rro_info": {
          "items": [
            {
              "amount": 2,
              "price": 202,
              "cost": 404,
              "id": 123456
            }
          ],
          "delivery_emails": [
            "email1@email.com",
            "email2@email.com"
          ]
        }
      },
      {
        "public_key": "i000000002",
        "amount": 200,
        "commission_payer": "receiver",
        "server_url": "https://server2/callback"
      }
    ]
   * ```
   *
   * __UK:__ Платіж з розщепленням суми на декількох одержувачів. У цьому параметрі вказується `JSON` масив з правилами розщеплення платежу. При використанні параметра `split_rules` відбувається одне списання з клієнта і кілька зарахувань одержувачам. Якщо необхідно передавати своє призначення по кожній сумі використовуйте параметр `description`.
   *
   * Якщо необхідно фіскалізувати платежі по кожному одержувачу слід додати об'єкт `rro_info`. Еквайрингова комісія стягується з кожного одержувача в масиві `split_rules`.
   * Приклад `JSON` рядка:
   * ```json
    [
      {
        "public_key": "i000000001",
        "amount": 404,
        "commission_payer": "sender",
        "server_url": "https://server1/callback",
        "rro_info": {
          "items": [
            {
              "amount": 2,
              "price": 202,
              "cost": 404,
              "id": 123456
            }
          ],
          "delivery_emails": [
            "email1@email.com",
            "email2@email.com"
          ]
        }
      },
      {
        "public_key": "i000000002",
        "amount": 200,
        "commission_payer": "receiver",
        "server_url": "https://server2/callback"
      }
    ]
   * ```
   */
  split_rules?: string;

  // SENDER PARAMS
  // ПАРАМЕТРИ ВІДПРАВНИКА

  /**
   * __EN:__ Sender address
   *
   * __UK:__ Адреса відправника
   */
  sender_address?: string;

  /**
   * __EN:__ Sender city
   *
   * __UK:__ Місто відправника
   */
  sender_city?: string;

  /**
   * __EN:__ Sender country code. Numeric __ISO 3166-1__ code
   *
   * __UK:__ Код країни відправника. Цифровий __ISO 3166-1__ код
   */
  sender_country_code?: string;

  /**
   * __EN:__ Sender first name
   *
   * __UK:__ Ім'я відправника
   */
  sender_first_name?: string;

  /**
   * __EN:__ Sender's last name
   *
   * __UK:__ Прізвище відправника
   */
  sender_last_name?: string;

  /**
   * __EN:__ Sender's postal code
   *
   * __UK:__ Поштовий індекс відправника
   */
  sender_postal_code?: string;

  // SUBSCRIPTION PARAMS
  // ПАРАМЕТРИ РЕГУЛЯРНОГО ПЛАТЕЖУ

  /**
   * __EN:__ Regular payment. Possible values: `1`
   *
   * __UK:__ Регулярний платіж. Можливі значення: `1`
   */
  subscribe?: '1';

  /**
   * __EN:__ Date of first payment. The time must be specified in the format `2015-03-31 00:00:00` in `UTC`. If the date is past, the subscription will be activated from the current date of receipt of the request
   *
   * __UK:__ Дата першого платежу. Час необхідно вказувати в такому форматі `2015-03-31 00:00:00` по `UTC`. Якщо вказана минула дата, то підписка буде активована з поточної дати отримання запиту
   */
  subscribe_date_start?: string;

  /**
   * __EN:__ The frequency of funds write-off.
   *
   * Possible values:
   * - `day` - daily
   * - `week` - weekly
   * - `month` - once a month
   * - `year` - once a year
   *
   * __UK:__ Періодичність списання коштів.
   *
   * Можливі значення:
   * - `day` - щодня
   * - `week` - щотижня
   * - `month` - раз на місяць
   * - `year` - раз на рік
   */
  subscribe_periodicity?: LiqPaySubscribePeriodicity;

  // ONE CLICK PAYMENT PARAMS
  // ПАРАМЕТРИ ДЛЯ ОПЛАТИ В 1 КЛІК

  /**
   * __EN:__ Unique client identifier on the merchant's website. When transmitting the parameter, LiqPay remembers the client's payment details and his identifier - further payment can be made in 1 click. Maximum length __100__ characters. (When using the parameter for __Masterpass 1 click__, a valid payer's phone number is transmitted in this field)
   *
   * __UK:__ Унікальний ідентифікатор клієнта на сайті мерчанта. При передачі параметра LiqPay запам'ятовує платіжні реквізити клієнта і його ідентифікатор - подальша оплата може бути проведена в 1 клік. Максимальна довжина __100__ символів. (При використанні параметра для __Masterpass 1 клік__, в даному полі передається валідний номер телефону платника)
   */
  customer?: string;

  /**
   * __EN:__ Allows you to generate a `card_token` of the payer, which you will receive in a callback request to `server_url`. `card_token` allows you to make payments without entering the payer's card details, using the token payment API - that is, in 1 click. To receive `card_token`, you must pass the value: `1` in the request
   *
   * __UK:__ Дозволяє генерувати `card_token` платника, який ви отримаєте в callback запиті на `server_url`. `card_token` дозволяє проводити платежі без введення реквізитів картки платника, використовуючи API оплати за токеном - тобто в 1 клік. Для отримання `card_token` необхідно передати в запиті значення: `1`
   */
  recurringbytoken?: '1';

  /**
   * __EN:__ User ID in the merchant system, transmitted with each user payment (must not match `customer`, used for payment using the __Masterpass 1 click__ wallet)
   *
   * __UK:__ Ідентифікатор користувача в системі мерчанта, передається при кожній оплаті користувача (не повинен збігатися з `customer`, використовується для оплати за допомогою гаманця __Masterpass 1 клік__)
   */
  customer_user_id?: string;

  // OTHER PARAMS
  // ІНШІ ПАРАМЕТРИ

  /**
   * __EN:__ Long Detail Addenda entry. __Required for merchants with MCC 4511__
   * 
   * The `dae` parameter is a `JSON` string to which the `base64` function has been applied. `JSON` can contain the parameters given in the example
   * 
   * Example of the dae parameter:
   `ewogICJhaXJMaW5lIjogIkROSVBST0FWSUEiLAogICJ0aWNrZXROdW1iZXIiOiAiQUNTRkQxMjM1NFNBIiwKICAicGFzc2VuZ2VyTmFtZSI6ICJKb2huIERvZSIsCiAgImZsaWdodE51bWJlciI6ICI3NDIiLAogICJvcmlnaW5DaXR5IjogIkRQIiwKICAiZGVzdGluYXRpb25DaXR5IjogIk5ZIiwKICAiZGVwYXJ0dXJlRGF0ZSI6ICIxMDA1MTQiCn0=`
   *
   * `JSON` example:
    ```json
      {
        "airLine": "Avia", // абревіатура авіакомпанії, max 4 символів.
        "ticketNumber": "ACSFD12354SA", // номер бронювання (локатор), max 15 символів. 
        "passengerName": "John Doe", // ім'я пасажира, max 29 символів.
        "flightNumber": "742", // dDae15, max 5 цифр.
        "originCity": "DP", // код міста/аеропорту вильоту, max 5 символів.
        "destinationCity": "NY", // код міста/аеропорту призначення, max 5 символів.
        "departureDate": "100514" // дата вильоту в форматі YYMMDD, max 6 цифр.
      }
    ``` 
   * 
   * __UK:__ Довгий запис Detail Addenda. __Обов'язковий для мерчантів з МСС 4511__
   *
   * Параметр `dae` являє собою `JSON` рядок, до якого застосували функцію `base64` `JSON` може містити параметри наведені у прикладі
   *
   * Приклад параметру dae: `ewogICJhaXJMaW5lIjogIkROSVBST0FWSUEiLAogICJ0aWNrZXROdW1iZXIiOiAiQUNTRkQxMjM1NFNBIiwKICAicGFzc2VuZ2VyTmFtZSI6ICJKb2huIERvZSIsCiAgImZsaWdodE51bWJlciI6ICI3NDIiLAogICJvcmlnaW5DaXR5IjogIkRQIiwKICAiZGVzdGluYXRpb25DaXR5IjogIk5ZIiwKICAiZGVwYXJ0dXJlRGF0ZSI6ICIxMDA1MTQiCn0=`
   * 
   * Приклад `JSON`:
    ```json
      {
        "airLine": "Avia", // абревіатура авіакомпанії, max 4 символів.
        "ticketNumber": "ACSFD12354SA", // номер бронювання (локатор), max 15 символів. 
        "passengerName": "John Doe", // ім'я пасажира, max 29 символів.
        "flightNumber": "742", // dDae15, max 5 цифр.
        "originCity": "DP", // код міста/аеропорту вильоту, max 5 символів.
        "destinationCity": "NY", // код міста/аеропорту призначення, max 5 символів.
        "departureDate": "100514" // дата вильоту в форматі YYMMDD, max 6 цифр.
      }
    ```
   */
  dae?: string; // stringified DetailAddenda

  /**
   * __EN:__ Information to add data to the payment. For example: `"External information for payments"`
   *
   * __UK:__ Інформація для додавання даних до платежу. Наприклад: `«External information for payments»`
   */
  info?: string;

  /**
   * __EN:__ Product category. Maximum length `25` characters
   *
   * __UK:__ Категорія товару. Максимальна довжина `25` символів
   */
  product_category?: string;

  /**
   * __EN:__ Product description. Maximum length `500` characters.
   *
   * __UK:__ Опис товару. Максимальна довжина `500` символів
   */
  product_description?: string;

  /**
   * __EN:__ Product name. Maximum length `100` characters.
   *
   * __UK:__ Назва товару. Максимальна довжина `100` символів
   */
  product_name?: string;

  /**
   * __EN:__ Product page address. Maximum length `510` characters
   *
   * __UK:__ Адреса сторінки з товаром. Максимальна довжина `510` символів
   */
  product_url?: string;
}

/**
 * __EN:__
 *
 * __UK:__
 */
export interface LiqPayRequestPayload extends LiqPayRequestData {
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
}

/**
 * __EN:__
 *
 * __UK:__
 */
export type LiqPayRequestAction =
  | 'pay'
  | 'hold'
  | 'subscribe'
  | 'paydonate'
  | 'auth';

/**
 * __EN:__
 *
 * __UK:__
 */
export type LiqPayRequestPaytype =
  | 'apay'
  | 'gpay'
  | 'card'
  | 'privat24'
  | 'moment_part'
  | 'paypart'
  | 'cash'
  | 'invoice'
  | 'qr';

/**
 * __EN:__ Data for fiscalization
 * 
 * Example of product data:
 * 
 * ```json
  rro_info: {
    "items": [
      {
        "amount": 2,
        "price": 202,
        "cost": 404,
        "id": 123456
      }
    ],
    "delivery_emails": ["email1@email.com", "email2@email.com"]
  }
  ```
 *
 * __UK:__ Дані для фіскалізації
 * 
 * Приклад даних про товари:
 * 
 * ```json
  rro_info: {
    "items": [
      {
        "amount": 2,
        "price": 202,
        "cost": 404,
        "id": 123456
      }
    ],
    "delivery_emails": ["email1@email.com", "email2@email.com"]
  }
  ```
 */
export interface LiqPayRroInfo {
  /**
   * __EN:__ Data about the goods for which payment is made
   *
   * __UK:__ Дані про товари, за які здійснюється оплата
   */
  items?: LiqPayRroInfoItem[];

  /**
   * __EN:__ List of e-mails to which receipts should be sent after fiscalization
   *
   * __UK:__ Перелік e-mail, на які треба відправити квитанції після фіскалізації
   */
  delivery_emails?: string[];
}

/**
 * __EN:__ Data about the product for which payment is being made
 *
 * __UK:__ Дані про товар, за який здійснюється оплата
 */
export interface LiqPayRroInfoItem {
  /**
   * __EN:__ Quantity/volume
   *
   * __UK:__ Кількість/обʼєм
   */
  amount: number;

  /**
   * __EN:__ The cost of all units of the specified product in the check (`quantity * unit_cost`)
   *
   * __UK:__ Вартість всіх одиниць вказанного товару в чеку (`кількість * вартість_одиниці`)
   */
  cost: number;

  /**
   * __EN:__ Product identifier. You can get it in your `Liqpay account - PPO - Cash register - Products`
   *
   * __UK:__ Ідентифікатор товару. Отримати можна в `кабінеті Liqpay - РРО - Каса - Товари`
   */
  id: number;

  /**
   * __EN:__ Unit price of the product
   *
   * __UK:__ Вартість одиниці товару
   */
  price: number;
}

/**
 * __EN:__ Payment splitting options
 *
 * __UK:__ Параметри розщеплення платежу
 */
export interface LiqPaySplitRule {
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
   * __EN:__ Toaol payment amount. For example: `5`, `7.34`
   *
   * __UK:__ Загальна сума платежу. Наприклад: `5`, `7.34`
   */
  amount: number;

  /**
   * __EN:__ Payer of the acquiring fee. Possible values: `sender`, `receiver`
   *
   * __UK:__ Платник еквайрингової комісії. Можливі значення: `sender`, `receiver`
   */
  commission_payer: LiqPayCommisionPayer;

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
  rro_info?: LiqPayRroInfo;
}

/**
 * __EN:__ Payer of the acquiring fee. Possible values: `sender`, `receiver`
 *
 * __UK:__ Платник еквайрингової комісії. Можливі значення: `sender`, `receiver`
 */
export type LiqPayCommisionPayer = 'sender' | 'receiver';

/**
 * __EN:__ Payment currency. Possible values: `USD`, `EUR`, `UAH`
 *
 * __UK:__ Валюта платежу. Можливі значення: `USD`, `EUR`, `UAH`
 */
export type LiqPayCurrency = 'USD' | 'EUR' | 'UAH';

/**
 * __EN:__ Client language: `uk`, `en`
 *
 * __UK:__ Мова клієнта: `uk`, `en`
 */
export type LiqPayLanguage = 'uk' | 'en';

/**
 * __EN:__ The frequency of funds write-off.
 *
 * Possible values:
 * - `day` - daily
 * - `week` - weekly
 * - `month` - once a month
 * - `year` - once a year
 *
 * __UK:__ Періодичність списання коштів.
 *
 * Можливі значення:
 * - `day` - щодня
 * - `week` - щотижня
 * - `month` - раз на місяць
 * - `year` - раз на рік
 */
export type LiqPaySubscribePeriodicity = 'day' | 'week' | 'month' | 'year';
