/**
 * Base LiqPay request/response envelope
 *
 * Contains the payload as a stringified and encrypted JSON (`data`) and a cryptographic `signature`.
 */
export interface Envelope {
	/**
	 * Stringified and encrypted payload
	 */
	data: string

	/**
	 * Signature for verifying payload integrity
	 */
	signature: string
}
