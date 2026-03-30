import { z } from 'zod'

export const CommisionPayerSchema = z.enum(['sender', 'receiver'])
export type CommisionPayer = z.infer<typeof CommisionPayerSchema>
