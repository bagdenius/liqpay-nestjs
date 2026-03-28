import { Inject, Injectable } from '@nestjs/common'

import { LiqPayClient } from '../core/liqpay.client'
import { LiqPayCheckoutRequest } from '../core/schemas/checkout'
import { LiqPayPaymentStatusRequest } from '../core/schemas/payment-status'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayOptions } from './interfaces'

@Injectable()
export class LiqpayService {
	private readonly privateKey: string
	private readonly publicKey: string
	private readonly resultUrl: string
	private readonly serverUrl: string

	private readonly client: LiqPayClient

	constructor(
		@Inject(LIQPAY_OPTIONS)
		private readonly options: LiqPayOptions,
	) {
		this.privateKey = options.privateKey
		this.publicKey = options.publicKey
		this.resultUrl = options.resultUrl ?? ''
		this.serverUrl = options.serverUrl ?? ''

		this.client = new LiqPayClient(this.publicKey, this.privateKey)
	}

	getCheckoutUrl(payload: LiqPayCheckoutRequest): string {
		return this.client.getCheckoutUrl({
			...payload,
			resultUrl: payload.resultUrl ?? this.resultUrl,
			serverUrl: payload.serverUrl ?? this.serverUrl,
		})
	}

	getCheckoutForm(
		payload: LiqPayCheckoutRequest,
		buttonText?: string,
		buttonColor?: string,
	): string {
		return this.client.getCheckoutFormButton(
			{
				...payload,
				resultUrl: payload.resultUrl ?? this.resultUrl,
				serverUrl: payload.serverUrl ?? this.serverUrl,
			},
			buttonText,
			buttonColor,
		)
	}

	async getPaymentStatus(orderId: string) {
		return this.client.getPaymentStatus(orderId)
	}
}
