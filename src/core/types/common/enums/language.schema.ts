import { z } from 'zod'

export const LanguageSchema = z.enum(['uk', 'en'])
export type Language = z.infer<typeof LanguageSchema>
