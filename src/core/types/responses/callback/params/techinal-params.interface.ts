export interface LiqPayTechnicalParams {
  /**
   * __EN:__ Acquirer ID
   *
   * __UK:__ ID еквайера
   */
  acq_id: number;

  /**
   * __EN:__ Payment type
   *
   * __UK:__ Тип платежу
   */
  type: string;

  /**
   * __EN:__ Payment Token
   *
   * __UK:__ Token платежу
   */
  token: string;

  /**
   * __EN:__ Verification code
   *
   * __UK:__ Код верифікації
   */
  verifycode: string;
}
