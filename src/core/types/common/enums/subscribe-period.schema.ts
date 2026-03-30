import { z } from 'zod'

export const SubscribePeriodicitySchema = z.enum([
	'day',
	'week',
	'month',
	'year',
])
export type SubscribePeriodicity = z.infer<typeof SubscribePeriodicitySchema>
