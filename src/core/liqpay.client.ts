import { createHash, timingSafeEqual } from 'node:crypto'
import z from 'zod'

import { LIQPAY_CHECKOUT_URL, LIQPAY_REQUEST_URL } from './constants'
import {
	LiqPayCallResult,
	LiqPayEnvelope,
	LiqPayRawRequest,
	LiqPayRequest,
	LiqPayResponse,
} from './schemas/base'
import {
	LiqPayCheckoutCallback,
	LiqPayCheckoutCallbackSchema,
	type LiqPayCheckoutRequest,
	LiqPayRawCheckoutRequestSchema,
} from './schemas/checkout'
import { LiqPayError, LiqPayErrorResponseSchema } from './schemas/error'
import {
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

	private decodeData(encodedData: string): unknown {
		return JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'))
	}

	private createSignature(encodedData: string): string {
		const signatureString = `${this.privateKey}${encodedData}${this.privateKey}`
		return createHash('sha3-256').update(signatureString).digest('base64')
	}

	private getCredentials(data: LiqPayRawRequest): LiqPayEnvelope {
		const payload: LiqPayRawRequest = { ...data, public_key: this.publicKey }
		const encoded = this.encodeData(payload)
		const signature = this.createSignature(encoded)
		return { data: encoded, signature }
	}

	private isValidSignature(envelope: LiqPayEnvelope): boolean {
		const expected = this.createSignature(envelope.data)
		const a = Buffer.from(expected)
		const b = Buffer.from(envelope.signature)
		if (a.length !== b.length) return false
		return timingSafeEqual(a, b)
	}

	private createError(
		code: LiqPayError['code'],
		description: string,
	): LiqPayCallResult<never> {
		return { data: null, error: { code, description } }
	}

	private parseData<T>(
		schema: z.ZodType<T>,
		data: unknown,
	): LiqPayCallResult<T> {
		const error = this.parseError(data)
		if (error) return error
		const parsed = schema.safeParse(data)
		if (!parsed.success)
			return this.createError('validation_error', 'Invalid response schema')
		return { data: parsed.data, error: null }
	}

	private parseError(data: unknown): LiqPayCallResult<never> | null {
		const parsed = LiqPayErrorResponseSchema.safeParse(data)
		if (!parsed.success) return null
		return this.createError(parsed.data.err_code, parsed.data.err_description)
	}

	private parseEnvelope<TResponse extends LiqPayResponse>(
		envelope: LiqPayEnvelope,
		schema: z.ZodType<TResponse>,
	): LiqPayCallResult<TResponse> {
		if (!this.isValidSignature(envelope))
			return this.createError('invalid_signature', 'Invalid signature')
		let rawData: unknown
		try {
			rawData = this.decodeData(envelope.data)
		} catch {
			return this.createError('decode_error', 'Failed to decode base64 data')
		}
		return this.parseData(schema, rawData)
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
	): Promise<LiqPayCallResult<TResponse>> {
		const raw = rawSchema.parse(payload)
		const envelope = this.getCredentials(raw)
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(envelope),
		})
		if (!response.ok)
			return this.createError('http_error', `HTTP ${response.status}`)
		let rawData: unknown
		try {
			rawData = await response.json()
		} catch {
			return this.createError(
				'invalid_response',
				'Failed to parse JSON response',
			)
		}
		return this.parseData(responseSchema, rawData)
	}

	public async getPaymentStatus(
		orderId: string,
	): Promise<LiqPayCallResult<LiqPayPaymentStatusResponse>> {
		return await this.call(
			{ version: 7, action: 'status', orderId },
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

	public parseCheckoutCallback(
		envelope: LiqPayEnvelope,
	): LiqPayCallResult<LiqPayCheckoutCallback> {
		return this.parseEnvelope(envelope, LiqPayCheckoutCallbackSchema)
	}
}
