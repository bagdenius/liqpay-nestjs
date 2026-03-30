import { z } from 'zod'

export const MpiEciSchema = z.enum(['5', '6', '7'])
export type MpiEci = z.infer<typeof MpiEciSchema>
