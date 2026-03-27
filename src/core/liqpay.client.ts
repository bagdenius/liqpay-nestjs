import axios from 'axios'

import { API_BASE_URL, CHECKOUT_URL } from './constants'
import type { LiqPayEnvelope } from './schemas'
import { type LiqPayCheckoutRequest } from './schemas/checkout'
import { type LiqPayPaymentStatusRequest } from './schemas/payment-status'
import { createSignature, decodeData, encodeData } from './utils'

// TODO: add checkStatus method
// TODO: add validations
// TODO: reconsider api call method
// TODO: configure request and response types
export class LiqPayClient {
	constructor(
		private publicKey: string,
		private privateKey: string,
	) {}

	getCredentials(
		params: LiqPayCheckoutRequest | LiqPayPaymentStatusRequest,
	): LiqPayEnvelope {
		const payload = { ...params, public_key: this.publicKey }
		const data = encodeData(payload)
		const signature = createSignature(this.privateKey, data)
		return { data, signature }
	}

	async post(
		path: string = 'request',
		params: LiqPayCheckoutRequest | LiqPayPaymentStatusRequest,
	): Promise<LiqPayEnvelope> {
		const credentials = this.getCredentials(params)

		const formData = new URLSearchParams()
		formData.append('data', credentials.data)
		formData.append('signature', credentials.signature)

		const url = `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

		const { data, status } = await axios.post(url, formData, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})

		if (status !== 200)
			throw new Error(`Request failed with status code: ${status}`)
		return data
	}

	getCheckoutUrl(params: LiqPayCheckoutRequest): string {
		const { data, signature } = this.getCredentials(params)
		return `${CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	getCheckoutForm(
		params: LiqPayCheckoutRequest,
		buttonText: string = 'Pay',
		buttonColor: string = '#77CC5D',
	): string {
		const { data, signature } = this.getCredentials(params)
		return `
      <form method="POST" action="${CHECKOUT_URL}" accept-charset="utf-8">
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
        <script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>
        <sdk-button label="${buttonText}" background="${buttonColor}" onClick="submit()"></sdk-button>
      </form>
    `
	}

	decodeData<T>(encodedData: string): T {
		return decodeData<T>(encodedData)
	}

	isValidSignature(response: LiqPayEnvelope) {
		return (
			createSignature(this.privateKey, response.data) === response.signature
		)
	}
}
