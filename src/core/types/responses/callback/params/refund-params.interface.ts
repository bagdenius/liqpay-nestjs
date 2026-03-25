export interface LiqPayRefundParams {
  /**
   * __EN:__ Refund amount
   *
   * __UK:__ Сума повернення
   */
  refund_amount: number;

  /**
   * __EN:__ Date of last payment refund
   *
   * __UK:__ Дата останнього повернення по платежу
   */
  refund_date_last: string;
}
