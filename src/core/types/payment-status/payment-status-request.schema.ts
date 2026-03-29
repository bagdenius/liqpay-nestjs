import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import { LiqPayActionSchema, LiqPayVersionSchema } from '../common/enums'

export const LiqPayPaymentStatusRequestSchema = z.object({
	version: LiqPayVersionSchema.optional(),
	publicKey: z.string().optional(),
	action: LiqPayActionSchema,
	orderId: z.string().max(255),
})
export type LiqPayPaymentStatusRequest = z.infer<
	typeof LiqPayPaymentStatusRequestSchema
>

export const LiqPayRawPaymentStatusRequestSchema =
	LiqPayPaymentStatusRequestSchema.transform(typed => {
		const snakelized = objectToSnake(typed)
		return { ...snakelized }
	})
export type LiqPayRawPaymentStatusRequest = z.infer<
	typeof LiqPayRawPaymentStatusRequestSchema
>
