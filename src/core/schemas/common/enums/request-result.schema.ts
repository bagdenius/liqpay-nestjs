import { z } from 'zod'

export const LiqPayRequestResultSchema = z.enum(['ok', 'error'])

export type LiqPayRequestResult = z.infer<typeof LiqPayRequestResultSchema>
