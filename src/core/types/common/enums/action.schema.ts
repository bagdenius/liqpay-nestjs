import z from 'zod'

export const ActionSchema = z.enum([
	'pay',
	'paytoken',
	'hold',
	'paysplit',
	'subscribe',
	'paydonate',
	'auth',
	'regular',
	'status',
])
export type Action = z.infer<typeof ActionSchema>
