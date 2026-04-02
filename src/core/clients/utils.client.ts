import { createHash, timingSafeEqual } from 'node:crypto'
import z from 'zod'

import {
	LiqPayEnvelope,
	LiqPayRawRequest,
	LiqPayRequest,
	LiqPayResponse,
	Result,
} from '../types/base'
import { LiqPayApiPath, REQUEST_URL } from '../types/common'
import { LiqPayError, LiqPayErrorResponseSchema } from '../types/error'

export class UtilsClient {
	constructor(
		public readonly publicKey: string,
		public readonly privateKey: string,
		public readonly resultUrl: string,
		public readonly serverUrl: string,
	) {}

	public encodeData(data: LiqPayRawRequest): string {
		return Buffer.from(JSON.stringify(data)).toString('base64')
	}

	public decodeData(encodedData: string): unknown {
		return JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'))
	}

	public createSignature(encodedData: string): string {
		const signatureString = `${this.privateKey}${encodedData}${this.privateKey}`
		return createHash('sha3-256').update(signatureString).digest('base64')
	}

	public toEnvelope(data: LiqPayRawRequest): LiqPayEnvelope {
		const encoded = this.encodeData(data)
		const signature = this.createSignature(encoded)
		return { data: encoded, signature }
	}

	public isValidSignature(envelope: LiqPayEnvelope): boolean {
		const expected = this.createSignature(envelope.data)
		const a = Buffer.from(expected)
		const b = Buffer.from(envelope.signature)
		if (a.length !== b.length) return false
		return timingSafeEqual(a, b)
	}

	public createError(
		code: LiqPayError['code'],
		description: string,
	): Result<never> {
		return { data: null, error: { code, description } }
	}

	public parseData<T>(schema: z.ZodType<T>, data: unknown): Result<T> {
		const error = this.parseError(data)
		if (error) return error
		const parsed = schema.safeParse(data)
		if (!parsed.success) {
			/** testing */
			console.log('PARSED ERROR: ', parsed.error)
			return this.createError('validation_error', 'Invalid response schema')
		}
		return { data: parsed.data, error: null }
	}

	public parseError(data: unknown): Result<never> | null {
		const parsed = LiqPayErrorResponseSchema.safeParse(data)
		if (!parsed.success) return null
		return this.createError(parsed.data.err_code, parsed.data.err_description)
	}

	public parseEnvelope<TResponse extends LiqPayResponse>(
		envelope: LiqPayEnvelope,
		schema: z.ZodType<TResponse>,
	): Result<TResponse> {
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

	/** testing version without signature validation */
	public parseEnvelopeTest<TResponse extends LiqPayResponse>(
		envelope: LiqPayEnvelope,
		schema: z.ZodType<TResponse>,
	): Result<TResponse> {
		const rawData = this.decodeData(envelope.data)
		console.log('RAW DATA: ', rawData)
		return this.parseData(schema, rawData)
	}

	public async call<
		TRequest extends LiqPayRequest,
		TRawRequest extends LiqPayRawRequest,
		TResponse extends LiqPayResponse,
	>(
		payload: TRequest,
		rawSchema: z.ZodType<TRawRequest>,
		responseSchema: z.ZodType<TResponse>,
		url: LiqPayApiPath = REQUEST_URL,
	): Promise<Result<TResponse>> {
		const raw = rawSchema.parse(payload)
		const envelope = this.toEnvelope(raw)
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

		/** testing */
		console.log('RAW DATA: ', rawData)

		return this.parseData(responseSchema, rawData)
	}
}
