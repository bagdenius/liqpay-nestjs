import z from 'zod'

export const CardTokenActionSchema = z.enum(['SUSPEND', 'UNSUSPEND', 'DELETE'])
export type CardTokenAction = z.infer<typeof CardTokenActionSchema>
