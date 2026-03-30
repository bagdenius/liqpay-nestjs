import { z } from 'zod'

export const BonusTypeSchema = z.enum([
	'bonusplus',
	'discount_club',
	'personal',
	'promo',
])
export type BonusType = z.infer<typeof BonusTypeSchema>
