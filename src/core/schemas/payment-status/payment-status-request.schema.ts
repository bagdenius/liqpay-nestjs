import z from 'zod'

import { LiqPayBaseSchema } from '../base'

export const LiqPayPaymentStatusRequestSchema = LiqPayBaseSchema.extend({
	action: z.literal('status'),
	order_id: z.string().max(255),
})

export type LiqPayPaymentStatusRequest = z.infer<
	typeof LiqPayPaymentStatusRequestSchema
>
