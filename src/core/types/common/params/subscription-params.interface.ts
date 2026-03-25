export interface LiqPaySubscriptionParams {
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
   * __UK:__ Періодичність списання коштів.
   *
   * Possible values:
   * - `day` - en: daily, uk: щодня
   * - `week` - en: weekly, uk: щотижня
   * - `month` - en: once a month, uk: раз на місяць
   * - `year` - en: once a year, uk: раз на рік
   */
  subscribe_periodicity?: LiqPaySubscribePeriodicity;
}

/**
 * __EN:__ The frequency of funds write-off.
 *
 * __UK:__ Періодичність списання коштів.
 *
 * __EN:__ Possible values: __UK:__ Можливі значення:
 *
 * - `day` - daily / щодня
 * - `week` - weekly / щотижня
 * - `month` - once a month / раз на місяць
 * - `year` - once a year / раз на рік
 */
export type LiqPaySubscribePeriodicity = 'day' | 'week' | 'month' | 'year';
