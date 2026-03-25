export interface LiqPayCommissionParams {
  /**
   * __EN:__ Sender's fee in payment currency
   *
   * __UK:__ Комісія з відправника у валюті платежу
   */
  sender_commission: number;

  /**
   * __EN:__ Recipient fee in payment currency
   *
   * __UK:__ Комісія з одержувача у валюті платежу
   */
  receiver_commission: number;

  /**
   * __EN:__ Agent commission in payment currency
   *
   * __UK:__ Комісія агента в валюті платежу
   */
  agent_commission: number;

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
}
