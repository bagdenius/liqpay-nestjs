import { LiqPayClient } from '../../core/clients'
import { RefundInput } from '../../core/types/refund'

export class RefundsService {
	public constructor(private readonly client: LiqPayClient) {}

	public async refund(payload: RefundInput) {
		return this.client.refunds.refund(payload)
	}
}
