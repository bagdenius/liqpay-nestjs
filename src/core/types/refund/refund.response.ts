import { objectToCamel } from 'ts-case-convert'
import z from 'zod'

import { parseBoolean, parseString, removeUndefined } from '../../utils'
import {
	ActionSchema,
	RequestResultSchema,
	ResolvedPaymentStatusSchema,
} from '../common/enums'

/**
 * Raw (non-normalized) response from LiqPay refund API.
 *
 * ⚠️ Notes:
 * - Field names are in snake_case as returned by LiqPay
 * - Some fields may have inconsistent types (e.g. string | number | boolean)
 * - Requires transformation before safe usage
 */
export const RawRefundResponseSchema = z.object({
	/**
	 * Result of query execution: `ok`, `error`
	 */
	result: RequestResultSchema.optional(),

	/**
	 * Refund type indicator. `true` - refund from future payments, `false` - from merchant account
	 */
	wait_amount: z.union([z.boolean(), z.string()]).optional(),

	/**
	 * Operation type. Possible values:
	 * - `pay` - payment
	 * - `hold` - blocking of funds on the sender's account
	 * - `subscribe` - regular payment
	 * - `paydonate` - donation
	 */
	action: ActionSchema.extract([
		'pay',
		'hold',
		'subscribe',
		'paydonate',
	]).optional(),

	/**
	 * Payment ID in the LiqPay system
	 */
	payment_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment status. Possible values:
	 * - `error` - Unsuccessful payment. Incorrectly filled data
	 * - `failure` - Unsuccessful payment
	 * - `reversed` - Payment reversed
	 * - `success` - Successful payment
	 */
	status: ResolvedPaymentStatusSchema.extract([
		'error',
		'failure',
		'reversed',
		'success',
	]).optional(),
})

/**
 * Type of raw refund response from LiqPay.
 */
export type RawRefundResponse = z.infer<typeof RawRefundResponseSchema>

/**
 * Normalized refund response.
 *
 * What this schema does:
 * - Converts keys from snake_case → camelCase
 * - Normalizes inconsistent field types
 * - removes `undefined` fields
 *
 * Transformations:
 * - `wait_amount` → `waitAmount` (boolean | undefined)
 * - `payment_id` → `paymentId` (string | undefined)
 */
export const RefundResponseSchema = RawRefundResponseSchema.transform(raw => {
	const camelized = objectToCamel(raw)
	const transformed = {
		...camelized,

		/**
		 * Refund type indicator. `true` - refund from future payments, `false` - from merchant account
		 */
		waitAmount: parseBoolean(camelized.waitAmount),

		/**
		 * Payment ID in the LiqPay system
		 */
		paymentId: parseString(camelized.paymentId),
	}
	return removeUndefined(transformed)
})

/**
 * Type of normalized refund response.
 * Safe to use in application logic.
 */
export type RefundResponse = z.infer<typeof RefundResponseSchema>
