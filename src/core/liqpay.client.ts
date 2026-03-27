import axios from 'axios'
import { createHash } from 'node:crypto'

import { API_BASE_URL, CHECKOUT_URL } from './constants'
import { LiqPayEnvelope } from './schemas/base'
import { type LiqPayCheckoutRequest } from './schemas/checkout'
import { type LiqPayPaymentStatusRequest } from './schemas/payment-status'

// TODO: add validations
// TODO: reconsider api call method
// TODO: reconsider and think over the structure on request and response types

/**
 * workflow:
 * 1) user register liqpay client where it needs to
 * 2) user builds data for request and call client method
 * 3) in client method data filled with key and got encoded
 * 4) client gets response with encoded data and signature
 * 5) client method decode data and returns it
 * 6) user gets only decoded data from response
 *
 * So this API only provides requests methods and returns encoded data from responses
 *
 * On request user:
 * 1) build typed data for request
 * 2) calls method from client
 *
 * On response/callback user:
 * 1) gets typed data from response/callback
 *
 * - on request user works only with typed data that stringifies and inserts into data field of envelope
 * - on response user works only with typed data that parses from decoded string layed in data field on envelope
 *
 * On request client:
 * 1) gets typed data object from user
 * 2) calls call api method
 * 3) validates typed data via zod
 * 4) maps typed data to form that LiqPay API expects it
 * 5) encodes typed data to string
 * 6) sends request with envelope that contains data: encoded string with data and signature
 *
 * On response/callback client:
 * 1) gets response/callback with envelope that contains data: encoded string with data and signature
 * 2) decodes and parse encoded string from data field in envelope
 * 3) maps encoded data to typed data
 * 4) validates typed data
 * 5) returns typed data to user
 */

/**
 * Client for easy interaction with LiqPay API
 */
export class LiqPayClient {
	public constructor(
		private readonly publicKey: string,
		private readonly privateKey: string,
	) {}

	// data must have public key when encoding so it will called only from client
	private encodeData(data: object): string {
		return Buffer.from(JSON.stringify(data)).toString('base64')
	}

	private decodeData<T = any>(encoded: string): T {
		return JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'))
	}

	public getCredentials(
		params: LiqPayCheckoutRequest | LiqPayPaymentStatusRequest,
	): LiqPayEnvelope {
		const payload = { ...params, public_key: this.publicKey }
		const data = this.encodeData(payload)
		const signature = this.createSignature(data)
		return { data, signature }
	}

	public createSignature(data: string): string {
		const signatureString = `${this.privateKey}${data}${this.privateKey}`
		return createHash('sha3-256').update(signatureString).digest('base64')
	}

	private async call<TResponse = any>(
		params: LiqPayCheckoutRequest | LiqPayPaymentStatusRequest,
		path: string = 'request',
	): Promise<TResponse> {
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

		const decoded = this.decodeData<TResponse>(data.data)
		return decoded
	}

	public getCheckoutUrl(params: LiqPayCheckoutRequest): string {
		const { data, signature } = this.getCredentials(params)
		return `${CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	public getCheckoutForm(
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

	public async getPaymentStatus(orderId: string) {
		const request: LiqPayPaymentStatusRequest = {
			version: 7,
			action: 'status',
			order_id: orderId,
			public_key: this.publicKey,
		}
		return await this.call(request)
	}

	public isValidSignature(response: LiqPayEnvelope): boolean {
		const expected = this.createSignature(response.data)
		return expected === response.signature
	}
}
