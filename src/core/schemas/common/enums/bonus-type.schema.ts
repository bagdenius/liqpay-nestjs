import { z } from 'zod'

export const LiqPayBonusTypeSchema = z.enum([
	'bonusplus',
	'discount_club',
	'personal',
	'promo',
])

export type LiqPayBonusType = z.infer<typeof LiqPayBonusTypeSchema>
