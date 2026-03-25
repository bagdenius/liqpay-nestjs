export interface LiqPayCustomerParams {
  /**
   * __EN:__ Unique client identifier on the merchant's website. When transmitting the parameter, LiqPay remembers the client's payment details and his identifier - further payment can be made in 1 click. Maximum length __100__ characters. (When using the parameter for __Masterpass 1 click__, a valid payer's phone number is transmitted in this field)
   *
   * __UK:__ Унікальний ідентифікатор клієнта на сайті мерчанта. При передачі параметра LiqPay запам'ятовує платіжні реквізити клієнта і його ідентифікатор - подальша оплата може бути проведена в 1 клік. Максимальна довжина __100__ символів. (При використанні параметра для __Masterpass 1 клік__, в даному полі передається валідний номер телефону платника)
   */
  customer?: string;

  /**
   * __EN:__ User ID in the merchant system, transmitted with each user payment (must not match `customer`, used for payment using the __Masterpass 1 click__ wallet)
   *
   * __UK:__ Ідентифікатор користувача в системі мерчанта, передається при кожній оплаті користувача (не повинен збігатися з `customer`, використовується для оплати за допомогою гаманця __Masterpass 1 клік__)
   */
  customer_user_id?: string;
}
