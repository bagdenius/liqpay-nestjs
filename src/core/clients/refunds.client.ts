import {
	RawRefundRequestSchema,
	RefundInput,
	RefundRequest,
	RefundResponseSchema,
} from '../types/refund'

import { UtilsClient } from './utils.client'

export class RefundsClient {
	public constructor(private readonly utils: UtilsClient) {}

	public refund(payload: RefundInput) {
		const request: RefundRequest = {
			...payload,
			version: 7,
			publicKey: this.utils.publicKey,
			action: 'refund',
		}
		this.utils.call(request, RawRefundRequestSchema, RefundResponseSchema)
	}
}
