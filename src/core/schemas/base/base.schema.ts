import z from 'zod'

export const LiqPayBaseSchema = z.object({
	version: z.literal(7),
	public_key: z.string(),
})
