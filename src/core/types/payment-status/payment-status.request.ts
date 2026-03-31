import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import { LiqPayVersion, PaymentStatusAction } from '../common/enums'

/**
 * Input data for retrieving payment status. Minimal payload required from the user.
 */
export const PaymentStatusInputSchema = z.object({
	/**
	 * Unique purchase ID in your store. Maximum length __255__ characters
	 */
	orderId: z.string().max(255),
})

/**
 * Type of payment status input.
 */
export type PaymentStatusInput = z.infer<typeof PaymentStatusInputSchema>

/**
 * Full payment status request (before serialization).
 *
 * Extends {@link PaymentStatusInput} with required LiqPay API fields.
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
	action: PaymentStatusAction
}

/**
 * Raw payment status request (snake_case).
 *
 * ⚠️ Notes:
 * - Converts camelCase → snake_case
 * - Does NOT modify values
 * - Does NOT perform validation
 *
 * Used before sending request to LiqPay API.
 */
export const RawPaymentStatusRequestSchema = z
	.custom<PaymentStatusRequest>()
	.transform(request => {
		const snakelized = objectToSnake(request)
		return { ...snakelized }
	})

/**
 * Type of raw payment status request.
 * - snake_case
 * - ready for encoding and sending to LiqPay
 */
export type RawPaymentStatusRequest = z.infer<
	typeof RawPaymentStatusRequestSchema
>
