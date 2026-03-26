import { z } from 'zod'

export const LiqPaySubscribePeriodicitySchema = z.enum([
	'day',
	'week',
	'month',
	'year',
])

export type LiqPaySubscribePeriodicity = z.infer<
	typeof LiqPaySubscribePeriodicitySchema
>
