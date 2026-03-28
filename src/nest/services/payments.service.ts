import { LiqPayClient } from '../../core/clients'
import { LiqPayCheckoutRequest } from '../../core/types/checkout'

export class LiqPayPaymentsService {
	public constructor(private readonly client: LiqPayClient) {}

	public getCheckoutUrl(payload: LiqPayCheckoutRequest): string {
		return this.client.payments.getCheckoutUrl(payload)
	}

	public getCheckoutForm(
		payload: LiqPayCheckoutRequest,
		buttonText?: string,
		buttonColor?: string,
	): string {
		return this.client.payments.getCheckoutFormButton(
			payload,
			buttonText,
			buttonColor,
		)
	}

	public create(payload: LiqPayCheckoutRequest) {
		return this.client.payments.create(payload)
	}

	public async getPaymentStatus(orderId: string) {
		return this.client.payments.getStatus(orderId)
	}
}
