import { z } from 'zod'

import { LiqPayErrorCodeSchema } from './error-code.schema'

/**
 * Standard error response format from LiqPay API
 */
export const LiqPayErrorResponseSchema = z.object({
	/**
	 * Response status. Always 'error' for this model
	 */
	status: z.literal('error'),

	/**
	 * Unique error code.
	 * Used for programmatic error handling (e.g., 'invalid_card', 'expired_card')
	 */
	err_code: LiqPayErrorCodeSchema,

	/**
	 * Human-readable description of the error in the language of the request
	 */
	err_description: z.string(),
})

/**
 * Standard error response format from LiqPay API
 */
export type LiqPayErrorResponse = z.infer<typeof LiqPayErrorResponseSchema>
