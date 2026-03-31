import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import { LiqPayVersion, RefundAction } from '../common/enums'

/**
 * Input data required to initiate a refund. This is the minimal payload provided by the user.
 */
export const RefundInputSchema = z.object({
	/**
	 * The refund amount. For example: `5`, `7.34`.
	 * The amount must be positive and cannot exceed the original transaction amount.
	 */
	amount: z.number().positive(),

	/**
	 * The unique purchase ID from your store associated with the original payment.
	 * Maximum length is __255__ characters.
	 */
	orderId: z.string().max(255),
})

/**
 * Type of refund input.
 */
export type RefundInput = z.infer<typeof RefundInputSchema>

/**
 * Full refund request payload (before serialization).
 */
export type RefundRequest = RefundInput & {
	/**
	 * API version. The current version is `7`.
	 */
	version: LiqPayVersion

	/**
	 * Public API key: The ID of the created company. Example: `i00000000`.
	 * You can retrieve this key in the store settings of your LiqPay cabinet.
	 */
	publicKey: string

	/**
	 * The type of operation. For this specific request, the value must be `refund`.
	 */
	action: RefundAction
}

/**
 * Raw refund request schema.
 *
 * ⚠️ Notes:
 * - Converts object keys from camelCase → snake_case
 * - Does NOT perform validation (assumes {@link RefundRequest} is already valid)
 *
 * Used right before sending data to LiqPay API.
 */
export const RawRefundRequestSchema = z
	.custom<RefundRequest>()
	.transform(request => {
		const snakelized = objectToSnake(request)
		return { ...snakelized }
	})

/**
 * Type of raw refund request (snake_case). Ready to be encoded and sent to LiqPay.
 */
export type RawRefundRequest = z.infer<typeof RawRefundRequestSchema>
