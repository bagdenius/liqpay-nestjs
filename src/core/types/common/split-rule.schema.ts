import { z } from 'zod'

import { CommisionPayerSchema } from './enums'
import { FiscalDataSchema } from './fiscal-data.schema'

export const SplitRuleSchema = z.object({
	public_key: z.string(),
	amount: z.number(),
	commission_payer: CommisionPayerSchema,
	server_url: z.string(),
	rro_info: FiscalDataSchema.optional(),
})

export type SplitRule = z.infer<typeof SplitRuleSchema>
