import { Result } from '../types/base'
import {
	type CheckoutRequest,
	RawCheckoutRequestSchema,
} from '../types/checkout'
import {
	PaymentStatusResponse,
	PaymentStatusResponseSchema,
	RawPaymentStatusRequestSchema,
} from '../types/payment-status'
import { CHECKOUT_URL, REQUEST_URL } from '../url.type'

import { UtilsClient } from './utils.client'

export class PaymentsClient {
	constructor(private readonly utils: UtilsClient) {}

	private fulfillPayload(payload: CheckoutRequest): CheckoutRequest {
		return {
			...payload,
			version: 7,
			resultUrl: payload.resultUrl ?? this.utils.resultUrl,
			serverUrl: payload.serverUrl ?? this.utils.serverUrl,
		}
	}

	private prepareCheckout(payload: CheckoutRequest) {
		const fullfilled = this.fulfillPayload(payload)
		const raw = RawCheckoutRequestSchema.parse(fullfilled)
		const { data, signature } = this.utils.getCredentials(raw)
		return { fullfilled, data, signature }
	}

	public getCheckoutUrl(payload: CheckoutRequest): string {
		const { data, signature } = this.prepareCheckout(payload)
		return `${CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	public create(
		payload: CheckoutRequest,
	): CheckoutRequest & { checkoutUrl: string } {
		const fullfilled = this.fulfillPayload(payload)
		return { ...fullfilled, checkoutUrl: this.getCheckoutUrl(fullfilled) }
	}

	public getCheckoutFormButton(
		payload: CheckoutRequest,
		buttonText: string = 'Pay',
		buttonColor: string = '#77CC5D',
	): string {
		const { data, signature } = this.prepareCheckout(payload)
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
