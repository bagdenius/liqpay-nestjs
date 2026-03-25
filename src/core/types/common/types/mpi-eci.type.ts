/**
 * __EN:__ Possible values:
 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
 * - `6` - the payer's card issuer does not support 3D-Secure technology
 * - `7` - the transaction was completed without 3D-Secure
 *
 * __UK:__ Можливі значення:
 * - `5` - транзакція пройшла з 3DS (емітент і еквайєр підтримують технологію 3D-Secure)
 * - `6` - емітент картки платника не підтримує технологію 3D-Secure
 * - `7` - операція пройшла без 3D-Secure
 */
export type LiqPayMpiEci = 5 | 6 | 7
