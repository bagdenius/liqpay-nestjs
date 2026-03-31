import { LiqPayClient } from '../../core/clients'
import { CheckoutInput } from '../../core/types/checkout'
import { PaymentStatusInput } from '../../core/types/payment-status'

export class PaymentsService {
	public constructor(private readonly client: LiqPayClient) {}

	public getCheckoutUrl(payload: CheckoutInput) {
		return this.client.payments.getCheckoutUrl(payload)
	}

	public hold(payload: CheckoutInput) {
		return this.client.payments.hold(payload)
	}

	public subscribe(payload: CheckoutInput) {
		return this.client.payments.subscribe(payload)
	}

	public getCheckoutButton(
		payload: CheckoutInput,
		buttonText?: string,
		buttonColor?: string,
	): string {
		return this.client.payments.getCheckoutButton(
			payload,
			buttonText,
			buttonColor,
		)
	}

	public async getStatus(payload: PaymentStatusInput) {
		return this.client.payments.getStatus(payload)
	}
}
