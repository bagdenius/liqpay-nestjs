import { Result } from '../types/base'
import {
	CheckoutInput,
	type CheckoutRequest,
	RawCheckoutRequestSchema,
} from '../types/checkout'
import { CHECKOUT_URL } from '../types/common'
import { CheckoutAction } from '../types/common/enums'
import {
	PaymentStatusInput,
	PaymentStatusRequest,
	PaymentStatusResponse,
	PaymentStatusResponseSchema,
	RawPaymentStatusRequestSchema,
} from '../types/payment-status'

import { UtilsClient } from './utils.client'

export class PaymentsClient {
	public constructor(private readonly utils: UtilsClient) {}

	private prepare(payload: CheckoutInput, action: CheckoutAction) {
		const request: CheckoutRequest = {
			...payload,
			action,
			version: 7,
			publicKey: this.utils.publicKey,
			resultUrl: payload.resultUrl ?? this.utils.resultUrl,
			serverUrl: payload.serverUrl ?? this.utils.serverUrl,
		}
		const raw = RawCheckoutRequestSchema.parse(request)
		const { data, signature } = this.utils.toEnvelope(raw)

		// testing purpose
		console.log('RAW: ', raw)

		return { request, data, signature }
	}

	private buildUrl(data: string, signature: string): string {
		return `${CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	private checkout(payload: CheckoutInput, action: CheckoutAction) {
		const { request, data, signature } = this.prepare(payload, action)
		return {
			request,
			data,
			signature,
			url: this.buildUrl(data, signature),
		}
	}

	public getCheckoutUrl(payload: CheckoutInput) {
		const { request, data, signature } = this.prepare(payload, 'pay')
		return {
			request,
			data,
			signature,
			url: this.buildUrl(data, signature),
		}
	}

	// TODO: implement
	public hold(payload: CheckoutInput) {
		const { request, data, signature } = this.prepare(payload, 'hold')
		return {
			request,
			data,
			signature,
			url: this.buildUrl(data, signature),
		}
	}

	// TODO: implement SubscriptionsClient with related methods

	// TODO: implement
	public subscribe(payload: CheckoutInput) {
		const { request, data, signature } = this.prepare(payload, 'subscribe')
		return {
			request,
			data,
			signature,
			url: this.buildUrl(data, signature),
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
		payload: PaymentStatusInput,
	): Promise<Result<PaymentStatusResponse>> {
		const request: PaymentStatusRequest = {
			...payload,
			action: 'status',
			version: 7,
			publicKey: this.utils.publicKey,
		}
		return await this.utils.call(
			request,
			RawPaymentStatusRequestSchema,
			PaymentStatusResponseSchema,
		)
	}
}
