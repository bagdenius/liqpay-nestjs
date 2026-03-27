import { LiqPayFiscalData } from './fiscal-data'
import { LiqPayCommisionPayer } from './types'

/**
 * Payment splitting options contract
 */
export interface LiqPaySplitRule {
	/**
	 * Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 */
	public_key: string

	/**
	 * Total payment amount. For example: `5`, `7.34`
	 */
	amount: number

	/**
	 * Payer of the acquiring fee. Possible values: `sender`, `receiver`
	 */
	commission_payer: LiqPayCommisionPayer

	/**
	 * API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
	 */
	server_url: string

	/**
	 * Data on fiscalization of payments for each recipient
	 */
	rro_info?: LiqPayFiscalData
}
