import { LiqPayClient } from '../../core/clients'
import { CheckoutRequest } from '../../core/types/checkout'

export class PaymentsService {
	public constructor(private readonly client: LiqPayClient) {}

	public getCheckoutUrl(payload: CheckoutRequest): string {
		return this.client.payments.getCheckoutUrl(payload)
	}

	public getCheckoutForm(
		payload: CheckoutRequest,
		buttonText?: string,
		buttonColor?: string,
	): string {
		return this.client.payments.getCheckoutFormButton(
			payload,
			buttonText,
			buttonColor,
		)
	}

	public create(payload: CheckoutRequest) {
		return this.client.payments.create(payload)
	}

	public async getPaymentStatus(orderId: string) {
		return this.client.payments.getStatus(orderId)
	}
}
