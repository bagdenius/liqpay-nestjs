import { PaymentsClient } from './payments.client'
import { RefundsClient } from './refunds.client'
import { UtilsClient } from './utils.client'
import { WebhooksClient } from './webhooks.client'

export class LiqPayClient {
	public payments: PaymentsClient
	public webhooks: WebhooksClient
	public refunds: RefundsClient

	constructor(options: {
		publicKey: string
		privateKey: string
		resultUrl?: string
		serverUrl?: string
	}) {
		const { publicKey, privateKey, resultUrl, serverUrl } = options
		const utils = new UtilsClient(
			publicKey,
			privateKey,
			resultUrl ?? '',
			serverUrl ?? '',
		)
		this.payments = new PaymentsClient(utils)
		this.webhooks = new WebhooksClient(utils)
		this.refunds = new RefundsClient(utils)
	}
}
