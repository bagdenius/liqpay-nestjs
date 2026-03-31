import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import { Action, LiqPayVersion } from '../common/enums'

/**
 * Schema of data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 */
export const PaymentStatusInputSchema = z.object({
	/**
	 * Unique purchase ID in your store. Maximum length __255__ characters
	 */
	orderId: z.string().max(255),
})

/**
 * Contract of data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 */
export type PaymentStatusInput = z.infer<typeof PaymentStatusInputSchema>

/**
 * Schema of data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 */
export type PaymentStatusRequest = PaymentStatusInput & {
	/**
	 * API version. Current version: `7`
	 */
	version: LiqPayVersion

	/**
	 * Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 */
	publicKey: string

	/**
	 * Operation type. Possible values: `status`
	 */
	action: Extract<Action, 'status'>
}

export const RawPaymentStatusRequestSchema = z
	.custom<PaymentStatusRequest>()
	.transform(typed => {
		const snakelized = objectToSnake(typed)
		return { ...snakelized }
	})

export type RawPaymentStatusRequest = z.infer<
	typeof RawPaymentStatusRequestSchema
>
