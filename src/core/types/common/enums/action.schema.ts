import z from 'zod'

export const LiqPayActionSchema = z.enum([
	'pay',
	'hold',
	'paysplit',
	'subscribe',
	'paydonate',
	'auth',
	'regular',
	'status',
])
export type LiqPayAction = z.infer<typeof LiqPayActionSchema>
