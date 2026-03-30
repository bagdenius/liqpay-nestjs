import { z } from 'zod'

export const PaytypeSchema = z.enum([
	'apay',
	'gpay',
	'card',
	'privat24',
	'masterpass',
	'moment_part',
	'paypart',
	'cash',
	'invoice',
	'qr',
])
export type Paytype = z.infer<typeof PaytypeSchema>
