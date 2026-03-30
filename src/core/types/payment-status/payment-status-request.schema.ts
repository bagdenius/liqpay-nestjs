import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import { ActionSchema, LiqPayVersionSchema } from '../common/enums'

export const PaymentStatusRequestSchema = z.object({
	version: LiqPayVersionSchema.optional(),
	publicKey: z.string().optional(),
	action: ActionSchema,
	orderId: z.string().max(255),
})
export type PaymentStatusRequest = z.infer<typeof PaymentStatusRequestSchema>

export const RawPaymentStatusRequestSchema =
	PaymentStatusRequestSchema.transform(typed => {
		const snakelized = objectToSnake(typed)
		return { ...snakelized }
	})
export type RawPaymentStatusRequest = z.infer<
	typeof RawPaymentStatusRequestSchema
>
