import { z } from 'zod'

export const LiqPayMpiEciSchema = z.union([
	z.literal(5),
	z.literal(6),
	z.literal(7),
])
export type LiqPayMpiEci = z.infer<typeof LiqPayMpiEciSchema>
