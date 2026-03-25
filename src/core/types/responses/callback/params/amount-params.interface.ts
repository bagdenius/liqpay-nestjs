export interface LiqPayAmountParams {
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
}
