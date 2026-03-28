import { createHash } from 'node:crypto'
import z from 'zod'

import { LIQPAY_CHECKOUT_URL, LIQPAY_REQUEST_URL } from './constants'
import {
	LiqPayEnvelope,
	LiqPayRawRequest,
	LiqPayRawResponse,
	LiqPayRequest,
	LiqPayResponse,
} from './schemas/base'
import {
	type LiqPayCheckoutRequest,
	LiqPayRawCheckoutRequestSchema,
} from './schemas/checkout'
import {
	type LiqPayPaymentStatusRequest,
	LiqPayPaymentStatusResponse,
	LiqPayPaymentStatusResponseSchema,
	LiqPayRawPaymentStatusRequestSchema,
} from './schemas/payment-status'

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
 *
 * For request build envelope with:
 * 1) data - stringified json encoded with base64
 * 2) signature - encoded base64(sha3-256(privateKey+data+privateKey))
 */

/**
 * Client for easy interaction with LiqPay API
 */
export class LiqPayClient {
	constructor(
		private readonly publicKey: string,
		private readonly privateKey: string,
	) {}

	private encodeData(data: LiqPayRawRequest): string {
		return Buffer.from(JSON.stringify(data)).toString('base64')
	}

	private decodeData<T extends LiqPayRawResponse>(encodedData: string): T {
		return JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'))
	}

	private createSignature(encodedData: string): string {
		const signatureString = `${this.privateKey}${encodedData}${this.privateKey}`
		return createHash('sha3-256').update(signatureString).digest('base64')
	}

	private getCredentials(data: LiqPayRawRequest): LiqPayEnvelope {
		const payload = { ...data, public_key: this.publicKey }
		const encoded = this.encodeData(payload)
		const signature = this.createSignature(encoded)
		return { data: encoded, signature }
	}

	private isValidSignature(envelope: LiqPayEnvelope): boolean {
		const expected = this.createSignature(envelope.data)
		return expected === envelope.signature
	}

	private async call<
		TRequest extends LiqPayRequest,
		TRawRequest extends LiqPayRawRequest,
		TResponse extends LiqPayResponse,
	>(
		payload: TRequest,
		rawSchema: z.ZodType<TRawRequest>,
		responseSchema: z.ZodType<TResponse>,
		url: string,
	): Promise<TResponse> {
		const raw = rawSchema.parse(payload)
		const envelope = this.getCredentials(raw)
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(envelope),
		})
		const rawData = await res.json()
		return responseSchema.parse(rawData)
	}

	public async getPaymentStatus(
		orderId: string,
	): Promise<LiqPayPaymentStatusResponse> {
		return await this.call(
			{
				version: 7,
				publicKey: this.publicKey,
				action: 'status',
				orderId,
			},
			LiqPayRawPaymentStatusRequestSchema,
			LiqPayPaymentStatusResponseSchema,
			LIQPAY_REQUEST_URL,
		)
	}

	public getCheckoutUrl(payload: LiqPayCheckoutRequest): string {
		const raw = LiqPayRawCheckoutRequestSchema.parse(payload)
		const { data, signature } = this.getCredentials(raw)
		return `${LIQPAY_CHECKOUT_URL}?data=${data}&signature=${signature}`
	}

	public getCheckoutFormButton(
		payload: LiqPayCheckoutRequest,
		buttonText: string = 'Pay',
		buttonColor: string = '#77CC5D',
	): string {
		const raw = LiqPayRawCheckoutRequestSchema.parse(payload)
		const { data, signature } = this.getCredentials(raw)
		return `
      <form method="POST" action="${LIQPAY_CHECKOUT_URL}" accept-charset="utf-8">
        <input type="hidden" name="data" value="${data}" />
        <input type="hidden" name="signature" value="${signature}" />
        <script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>
        <sdk-button label="${buttonText}" background="${buttonColor}" onClick="submit()"></sdk-button>
      </form>
    `
	}
}
