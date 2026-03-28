import { z } from 'zod'

export const LiqPayPaytypeSchema = z.enum([
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
export type LiqPayPaytype = z.infer<typeof LiqPayPaytypeSchema>
