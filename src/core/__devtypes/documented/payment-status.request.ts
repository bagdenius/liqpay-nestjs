/**
 * Contract of data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 */
export interface PaymentStatusRequest {
	/**
	 * API version. Current version: `7`
	 */
	version: 7

	/**
	 * Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 */
	public_key: string

	/**
	 * Operation type. Possible values: `status`
	 */
	action: 'status'

	/**
	 * Unique purchase ID in your store. Maximum length __255__ characters
	 */
	order_id: string
}
