import { LiqPayClient } from '../../core/clients'
import { LiqPayEnvelope } from '../../core/types/base'

export class WebhooksService {
	public constructor(private readonly client: LiqPayClient) {}

	public async parseCheckoutCallback(envelope: LiqPayEnvelope) {
		return this.client.webhooks.parseCheckoutCallback(envelope)
	}

	public async parseCheckoutCallbackTest(envelope: LiqPayEnvelope) {
		return this.client.webhooks.parseCheckoutCallbackTest(envelope)
	}
}
