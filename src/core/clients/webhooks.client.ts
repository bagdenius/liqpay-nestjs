import { LiqPayEnvelope, Result } from '../types/base'
import { CheckoutCallback, CheckoutCallbackSchema } from '../types/checkout'

import { UtilsClient } from './utils.client'

export class WebhooksClient {
	constructor(private readonly utils: UtilsClient) {}

	public parseCheckoutCallback(
		envelope: LiqPayEnvelope,
	): Result<CheckoutCallback> {
		return this.utils.parseEnvelope(envelope, CheckoutCallbackSchema)
	}

	public parseCheckoutCallbackTest(
		envelope: LiqPayEnvelope,
	): Result<CheckoutCallback> {
		return this.utils.parseEnvelopeTest(envelope, CheckoutCallbackSchema)
	}
}
