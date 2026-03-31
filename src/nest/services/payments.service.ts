import { LiqPayClient } from '../../core/clients'
import { CheckoutInput } from '../../core/types/checkout'

export class PaymentsService {
	public constructor(private readonly client: LiqPayClient) {}

	public pay(payload: CheckoutInput) {
		return this.client.payments.pay(payload)
	}

	public hold(payload: CheckoutInput) {
		return this.client.payments.hold(payload)
	}

	public subscribe(payload: CheckoutInput) {
		return this.client.payments.subscribe(payload)
	}

	public getPayButton(
		payload: CheckoutInput,
		buttonText?: string,
		buttonColor?: string,
	): string {
		return this.client.payments.getPayButton(payload, buttonText, buttonColor)
	}

	public async getPaymentStatus(orderId: string) {
		return this.client.payments.getStatus(orderId)
	}
}
