export interface LiqPayTransactionParams {
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
}
