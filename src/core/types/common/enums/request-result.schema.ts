import { z } from 'zod'

export const RequestResultSchema = z.enum(['ok', 'error'])
export type RequestResult = z.infer<typeof RequestResultSchema>
