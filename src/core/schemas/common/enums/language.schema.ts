import { z } from 'zod'

export const LiqPayLanguageSchema = z.enum(['uk', 'en'])

export type LiqPayLanguage = z.infer<typeof LiqPayLanguageSchema>
