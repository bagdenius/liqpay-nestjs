import { z } from 'zod'

export const LiqPayMpiEciSchema = z.enum(['5', '6', '7'])
export type LiqPayMpiEci = z.infer<typeof LiqPayMpiEciSchema>
