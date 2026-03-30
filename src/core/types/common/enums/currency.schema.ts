import z from 'zod'

export const CurrencySchema = z.enum(['USD', 'EUR', 'UAH'])
export type Currency = z.infer<typeof CurrencySchema>
