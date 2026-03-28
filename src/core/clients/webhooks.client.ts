import { LiqPayCallResult, LiqPayEnvelope } from '../types/base'
import {
	LiqPayCheckoutCallback,
	LiqPayCheckoutCallbackSchema,
} from '../types/checkout'

import { LiqPayUtilsClient } from './utils.client'

export class LiqPayWebhooksClient {
	constructor(private readonly utils: LiqPayUtilsClient) {}

	public parseCheckoutCallback(
		envelope: LiqPayEnvelope,
	): LiqPayCallResult<LiqPayCheckoutCallback> {
		return this.utils.parseEnvelope(envelope, LiqPayCheckoutCallbackSchema)
	}
}
