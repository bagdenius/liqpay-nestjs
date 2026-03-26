import { z } from 'zod'

import { LiqPayErrorCodeSchema } from './error-code.schema'

export const LiqPayErrorResponseSchema = z.object({
	status: z.literal('error'),
	err_code: LiqPayErrorCodeSchema,
	err_description: z.string(),
})

export type LiqPayErrorResponse = z.infer<typeof LiqPayErrorResponseSchema>
