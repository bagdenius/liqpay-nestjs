/**
 * __EN:__ Data for fiscalization
 *
 * __UK__: Дані про фіскалізацію
 *
 * @example
 * ```json
 * {
 *   "items": [
 *     {
 *       "amount": 2,   // en: quantity/uk: кількість
 *       "price": 202,  // en: unit price/uk: вартість одиниці
 *       "cost": 404,   // en: total cost/uk: вартість всіх одиниць
 *       "id": 123456   // en: product id/uk: ідентифікатор товару
 *     }
 *   ],
 *   "delivery_emails": ["email1@email.com", "email2@email.com"] // en: emails for receipts/uk: e-mail для квитанцій
 * }
 * ```
 */
export interface LiqPayPaymentRroInfo {
  /**
   * __EN:__ Data about the goods for which payment is made
   *
   * __UK:__ Дані про товари, за які здійснюється оплата
   */
  items?: LiqPayPaymentRroInfoItem[];

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
export interface LiqPayPaymentRroInfoItem {
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

// TODO: add data for fiscalization with the transfer of goods
// TODO: додати дані для фіскалізації з передачею товарів
