import z from 'zod'

export const LiqPayVersionSchema = z.literal(7)
export type LiqPayVersion = z.infer<typeof LiqPayVersionSchema>
