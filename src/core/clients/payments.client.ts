import { LiqPayCallResult } from '../types/base'
import {
	type LiqPayCheckoutRequest,
	LiqPayRawCheckoutRequestSchema,
} from '../types/checkout'
import {
	LiqPayPaymentStatusResponse,
	LiqPayPaymentStatusResponseSchema,
	LiqPayRawPaymentStatusRequestSchema,
} from '../types/payment-status'
import { LIQPAY_CHECKOUT_URL, LIQPAY_REQUEST_URL } from '../url.type'

import { LiqPayUtilsClient } from './utils.client'

export class LiqPayPaymentsClient {
	constructor(private readonly utils: LiqPayUtilsClient) {}

	private fulfillPayload(
		payload: LiqPayCheckoutRequest,
	): LiqPayCheckoutRequest {
		return {
			...payload,
			version: 7,
			resultUrl: payload.resultUrl ?? this.utils.resultUrl,
			serverUrl: payload.serverUrl ?? this.utils.serverUrl,
		}
	}

	private prepareCheckout(payload: LiqPayCheckoutRequest) {
		const fullfilled = this.fulfillPayload(payload)
		const raw = LiqPayRawCheckoutRequestSchema.parse(fullfilled)
		const { data, signature } = this.utils.getCredentials(raw)
		return { fullfilled, data, signature }
	}

	public getCheckoutUrl(payload: LiqPayCheckoutRequest): string {
		const { data, signature } = this.prepareCheckout(payload)
		return `${LIQPAY_CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	public create(
		payload: LiqPayCheckoutRequest,
	): LiqPayCheckoutRequest & { checkoutUrl: string } {
		const fullfilled = this.fulfillPayload(payload)
		return { ...fullfilled, checkoutUrl: this.getCheckoutUrl(fullfilled) }
	}

	public getCheckoutFormButton(
		payload: LiqPayCheckoutRequest,
		buttonText: string = 'Pay',
		buttonColor: string = '#77CC5D',
	): string {
		const { data, signature } = this.prepareCheckout(payload)
		return `
      <form method="POST" action="${LIQPAY_CHECKOUT_URL}" accept-charset="utf-8">
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
        <script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>
        <sdk-button label="${buttonText}" background="${buttonColor}" onClick="submit()"></sdk-button>
      </form>
    `
	}

	public async getStatus(
		orderId: string,
	): Promise<LiqPayCallResult<LiqPayPaymentStatusResponse>> {
		return await this.utils.call(
			{ action: 'status', orderId },
			LiqPayRawPaymentStatusRequestSchema,
			LiqPayPaymentStatusResponseSchema,
			LIQPAY_REQUEST_URL,
		)
	}
}
