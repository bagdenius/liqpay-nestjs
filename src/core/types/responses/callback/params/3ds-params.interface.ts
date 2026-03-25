import type { LiqPayMpiEci } from '../../../common'

export interface LiqPay3DSInfo {
	/**
	 * __EN:__ Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
	 *
	 * __UK:__ Можливі значення: `true` - транзакція пройшла з 3DS перевіркою, `false` - транзакція пройшла без 3DS перевірки
	 */
	is_3ds: boolean

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
	mpi_eci: LiqPayMpiEci

	/**
	 * __EN:__ Link to which the client must be redirected to complete 3DS verification
	 *
	 * __UK:__ Посилання на яке необхідно перенаправляти клієнта для проходження 3DS верифікації
	 */
	redirect_to: string
}
