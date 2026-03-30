import { PaymentsClient } from './payments.client'
import { UtilsClient } from './utils.client'
import { WebhooksClient } from './webhooks.client'

export class LiqPayClient {
	public payments: PaymentsClient
	public webhooks: WebhooksClient

	constructor(
		publicKey: string,
		privateKey: string,
		resultUrl: string,
		serverUrl: string,
	) {
		const utils = new UtilsClient(publicKey, privateKey, resultUrl, serverUrl)
		this.payments = new PaymentsClient(utils)
		this.webhooks = new WebhooksClient(utils)
	}
}
