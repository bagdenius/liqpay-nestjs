import z from 'zod'

export const LiqPayCurrencySchema = z.enum(['USD', 'EUR', 'UAH'])

export type LiqPayCurrency = z.infer<typeof LiqPayCurrencySchema>
