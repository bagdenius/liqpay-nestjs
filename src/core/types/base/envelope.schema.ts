import z from 'zod'

export const LiqPayEnvelopeSchema = z.object({
	data: z.string().nonempty(),
	signature: z.string().nonempty(),
})
export type LiqPayEnvelope = z.infer<typeof LiqPayEnvelopeSchema>
