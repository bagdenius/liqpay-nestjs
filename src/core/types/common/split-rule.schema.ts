import { z } from 'zod'

import { LiqPayCommisionPayerSchema } from './enums'
import { LiqPayFiscalDataSchema } from './fiscal-data.schema'

export const LiqPaySplitRuleSchema = z.object({
	public_key: z.string(),
	amount: z.number(),
	commission_payer: LiqPayCommisionPayerSchema,
	server_url: z.string(),
	rro_info: LiqPayFiscalDataSchema.optional(),
})

export type LiqPaySplitRule = z.infer<typeof LiqPaySplitRuleSchema>
