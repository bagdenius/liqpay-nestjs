import { Inject, Injectable } from '@nestjs/common'

import { LiqPayClient } from '../core/clients'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayOptions } from './interfaces'
import { LiqPayPaymentsService, LiqPayWebhooksService } from './services'

@Injectable()
export class LiqpayService {
	public readonly payments: LiqPayPaymentsService
	public readonly webhooks: LiqPayWebhooksService

	public constructor(
		@Inject(LIQPAY_OPTIONS)
		private readonly options: LiqPayOptions,
	) {
		const { privateKey, publicKey, resultUrl, serverUrl } = options
		const client = new LiqPayClient(
			publicKey,
			privateKey,
			resultUrl ?? '',
			serverUrl ?? '',
		)
		this.payments = new LiqPayPaymentsService(client)
		this.webhooks = new LiqPayWebhooksService(client)
	}
}
