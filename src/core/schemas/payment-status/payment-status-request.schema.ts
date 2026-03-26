import { z } from 'zod'

export const LiqPayPaymentStatusRequestSchema = z.object({
	version: z.literal(7),
	public_key: z.string(),
	action: z.literal('status'),
	order_id: z.string().max(255),
})

export type LiqPayPaymentStatusRequest = z.infer<
	typeof LiqPayPaymentStatusRequestSchema
>
