import { Inject, Injectable } from '@nestjs/common'
import { env } from 'node:process'

import { LiqPayClient } from '../core/liqpay.client'
import { LiqPayEnvelope } from '../core/schemas/base'
import { LiqPayCheckoutRequest } from '../core/schemas/checkout'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayOptions } from './interfaces'

@Injectable()
export class LiqpayService {
	private readonly privateKey: string
	private readonly publicKey: string
	private readonly resultUrl: string
	private readonly serverUrl: string

	private readonly client: LiqPayClient

	public constructor(
		@Inject(LIQPAY_OPTIONS)
		private readonly options: LiqPayOptions,
	) {
		this.privateKey = options.privateKey
		this.publicKey = options.publicKey
		this.resultUrl = options.resultUrl ?? ''
		this.serverUrl = options.serverUrl ?? ''

		this.client = new LiqPayClient(this.publicKey, this.privateKey)
	}

	public getCheckoutUrl(payload: LiqPayCheckoutRequest): string {
		return this.client.getCheckoutUrl({
			...payload,
			resultUrl: payload.resultUrl ?? this.resultUrl,
			serverUrl: payload.serverUrl ?? this.serverUrl,
		})
	}

	public getCheckoutForm(
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

	public async getPaymentStatus(orderId: string) {
		return this.client.getPaymentStatus(orderId)
	}

	public async parseCheckoutCallback(envelope: LiqPayEnvelope) {
		return this.client.parseCheckoutCallback(envelope)
	}
}
