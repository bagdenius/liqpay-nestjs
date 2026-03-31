import { Result } from '../types/base'
import {
	CheckoutInput,
	type CheckoutRequest,
	RawCheckoutRequestSchema,
} from '../types/checkout'
import { Action } from '../types/common/enums'
import {
	PaymentStatusResponse,
	PaymentStatusResponseSchema,
	RawPaymentStatusRequestSchema,
} from '../types/payment-status'
import { CHECKOUT_URL, REQUEST_URL } from '../url.type'

import { UtilsClient } from './utils.client'

export class PaymentsClient {
	constructor(private readonly utils: UtilsClient) {}

	private prepare(payload: CheckoutInput, action: Action) {
		const fullfilled: CheckoutRequest = {
			...payload,
			action,
			version: 7,
			publicKey: this.utils.publicKey,
			resultUrl: payload.resultUrl ?? this.utils.resultUrl,
			serverUrl: payload.serverUrl ?? this.utils.serverUrl,
		}
		const raw = RawCheckoutRequestSchema.parse(fullfilled)
		const { data, signature } = this.utils.toEnvelope(raw)
		return { fullfilled, data, signature }
	}

	private buildUrl(data: string, signature: string): string {
		return `${CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	private checkout(payload: CheckoutInput, action: Action) {
		const { fullfilled, data, signature } = this.prepare(payload, action)
		return {
			...fullfilled,
			url: this.buildUrl(data, signature),
			data,
			signature,
		}
	}

	public getCheckoutUrl(payload: CheckoutInput) {
		const { fullfilled, data, signature } = this.prepare(payload, 'pay')
		return {
			...fullfilled,
			url: this.buildUrl(data, signature),
			data,
			signature,
		}
	}

	// TODO: implement
	public hold(payload: CheckoutInput) {
		const { fullfilled, data, signature } = this.prepare(payload, 'hold')
		return {
			...fullfilled,
			url: this.buildUrl(data, signature),
			data,
			signature,
		}
	}

	// TODO: implement SubscriptionsClient with related methods

	// TODO: implement
	public subscribe(payload: CheckoutInput) {
		const { fullfilled, data, signature } = this.prepare(payload, 'subscribe')
		return {
			...fullfilled,
			url: this.buildUrl(data, signature),
			data,
			signature,
		}
	}

	public getCheckoutButton(
		payload: CheckoutInput,
		buttonText: string = 'Pay',
		buttonColor: string = '#77CC5D',
	): string {
		const { data, signature } = this.prepare(payload, 'pay')
		return `
      <form method="POST" action="${CHECKOUT_URL}" accept-charset="utf-8">
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
        <script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>
        <sdk-button label="${buttonText}" background="${buttonColor}" onClick="submit()"></sdk-button>
      </form>
    `
	}

	public async getStatus(
		orderId: string,
	): Promise<Result<PaymentStatusResponse>> {
		return await this.utils.call(
			{ action: 'status', orderId },
			RawPaymentStatusRequestSchema,
			PaymentStatusResponseSchema,
			REQUEST_URL,
		)
	}
}
