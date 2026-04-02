import {
	RawRefundRequestSchema,
	RefundInput,
	RefundRequest,
	RefundResponseSchema,
} from '../types/refund'

import { UtilsClient } from './utils.client'

export class RefundsClient {
	public constructor(private readonly utils: UtilsClient) {}

	public async refund(payload: RefundInput) {
		const request: RefundRequest = {
			...payload,
			version: 7,
			publicKey: this.utils.publicKey,
			action: 'refund',
		}
		return await this.utils.call(
			request,
			RawRefundRequestSchema,
			RefundResponseSchema,
		)
	}
}
