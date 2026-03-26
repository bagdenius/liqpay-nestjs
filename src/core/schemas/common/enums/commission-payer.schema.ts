import { z } from 'zod'

export const LiqPayCommisionPayerSchema = z.enum(['sender', 'receiver'])

export type LiqPayCommisionPayer = z.infer<typeof LiqPayCommisionPayerSchema>
