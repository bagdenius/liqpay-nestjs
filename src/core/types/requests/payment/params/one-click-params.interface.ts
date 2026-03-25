import type { LiqPayCustomerParams } from '../../../common';

/**
 * __EN:__ One-click payment params
 *
 * __UK:__ Параметри для оплати в 1 клік
 */
export interface LiqPayOneClickParams extends LiqPayCustomerParams {
  /**
   * __EN:__ Allows you to generate a `card_token` of the payer, which you will receive in a callback request to `server_url`. `card_token` allows you to make payments without entering the payer's card details, using the token payment API - that is, in 1 click. To receive `card_token`, you must pass the value: `1` in the request
   *
   * __UK:__ Дозволяє генерувати `card_token` платника, який ви отримаєте в callback запиті на `server_url`. `card_token` дозволяє проводити платежі без введення реквізитів картки платника, використовуючи API оплати за токеном - тобто в 1 клік. Для отримання `card_token` необхідно передати в запиті значення: `1`
   */
  recurringbytoken?: '1';
}
