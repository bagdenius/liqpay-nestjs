import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import { LiqPayActionSchema, LiqPayVersionSchema } from '../common/enums'

export const LiqPayPaymentStatusRequestSchema = z.object({
	version: LiqPayVersionSchema,
	publicKey: z.string(),
	action: LiqPayActionSchema,
	orderId: z.string().max(255),
})
export type LiqPayPaymentStatusRequest = z.infer<
	typeof LiqPayPaymentStatusRequestSchema
>

export const LiqPayRawPaymentStatusRequestSchema =
	LiqPayPaymentStatusRequestSchema.transform(typed => {
		const snakelized = objectToSnake(typed)
		return {
			...snakelized,
			version: Number(snakelized.version),
			action: String(snakelized.action),
		}
	})
export type LiqPayRawPaymentStatusRequest = z.infer<
	typeof LiqPayRawPaymentStatusRequestSchema
>
