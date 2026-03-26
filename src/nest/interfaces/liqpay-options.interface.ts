/**
 * Configuration options for LiqPay module
 */
export interface LiqPayOptions {
	/**
	 * Public Key from LiqPay account.
	 */
	publicKey: string

	/**
	 * Private Key from LiqPay account.
	 */
	privateKey: string

	/**
	 * Callback URL to server endpoint. LiqPay will send resulting data about processed Payment. Optional — can be overridden per request.
	 */
	serverUrl?: string

	/**
	 * Redirect URL. LiqPay will redirect client to provided URL. Optional — can be overridden per request.
	 */
	resultUrl?: string

	/**
	 * If `true`, registers LiqPayModule as a global module. `false` set by default
	 */
	isGlobal?: boolean
}
