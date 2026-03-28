import { LiqPayPaymentsClient } from './payments.client'
import { LiqPayUtilsClient } from './utils.client'
import { LiqPayWebhooksClient } from './webhooks.client'

export class LiqPayClient {
	public payments: LiqPayPaymentsClient
	public webhooks: LiqPayWebhooksClient

	constructor(
		publicKey: string,
		privateKey: string,
		resultUrl: string,
		serverUrl: string,
	) {
		const utils = new LiqPayUtilsClient(
			publicKey,
			privateKey,
			resultUrl,
			serverUrl,
		)
		this.payments = new LiqPayPaymentsClient(utils)
		this.webhooks = new LiqPayWebhooksClient(utils)
	}
}
