export interface LiqPayPaymentStatusRequest {
	version: 7
	public_key: string
	action: 'status'
	order_id: string
}
