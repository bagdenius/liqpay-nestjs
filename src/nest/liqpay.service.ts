import { Inject, Injectable } from '@nestjs/common'

import { LiqPayClient } from '../core/clients'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayOptions } from './interfaces'
import { PaymentsService, RefundsService, WebhooksService } from './services'

@Injectable()
export class LiqpayService {
	public readonly payments: PaymentsService
	public readonly webhooks: WebhooksService
	public readonly refunds: RefundsService

	public constructor(
		@Inject(LIQPAY_OPTIONS)
		private readonly options: LiqPayOptions,
	) {
		const client = new LiqPayClient(options)
		this.payments = new PaymentsService(client)
		this.webhooks = new WebhooksService(client)
		this.refunds = new RefundsService(client)
	}
}
