import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import {
	LiqPayDetailAddendaSchema,
	LiqPayFiscalDataSchema,
	LiqPaySplitRuleSchema,
} from '../common'
import {
	LiqPayActionSchema,
	LiqPayCurrencySchema,
	LiqPayLanguageSchema,
	LiqPayPaytypeSchema,
	LiqPaySubscribePeriodicitySchema,
	LiqPayVersionSchema,
} from '../common/enums'

export const LiqPayCheckoutRequestSchema = z.object({
	// MAIN PARAMS
	version: LiqPayVersionSchema,
	publicKey: z.string().optional(),
	action: LiqPayActionSchema,
	amount: z.number().positive(),
	currency: LiqPayCurrencySchema,
	description: z.string(),
	orderId: z.string().max(255),
	rroInfo: LiqPayFiscalDataSchema.optional(),
	expiredDate: z.date().optional(),
	language: LiqPayLanguageSchema.optional(),
	paytypes: z.array(LiqPayPaytypeSchema).optional(),
	resultUrl: z.string().max(510).optional(),
	serverUrl: z.string().max(510).optional(),
	verifycode: z.literal('Y').optional(),
	splitRules: z.array(LiqPaySplitRuleSchema).optional(),

	// SENDER PARAMS
	senderAddress: z.string().optional(),
	senderCity: z.string().optional(),
	senderCountryCode: z.string().optional(),
	senderFirstName: z.string().optional(),
	senderLastName: z.string().optional(),
	senderPostalCode: z.string().optional(),

	// SUBSCRIPTION PARAMS
	subscribe: z.literal('1').optional(),
	subscribeDateStart: z.date().optional(),
	subscribePeriodicity: LiqPaySubscribePeriodicitySchema.optional(),

	// ONE CLICK PAYMENT PARAMS
	customer: z.string().max(100).optional(),
	recurringbytoken: z.literal('1').optional(),
	customerUserId: z.string().optional(),

	// OTHER PARAMS
	dae: LiqPayDetailAddendaSchema.optional(),
	info: z.string().optional(),
	productCategory: z.string().max(25).optional(),
	productDescription: z.string().max(500).optional(),
	productName: z.string().max(100).optional(),
	productUrl: z.string().max(510).optional(),
})
export type LiqPayCheckoutRequest = z.infer<typeof LiqPayCheckoutRequestSchema>

export const LiqPayRawCheckoutRequestSchema =
	LiqPayCheckoutRequestSchema.transform(typed => {
		const snakelized = objectToSnake(typed)
		return {
			...snakelized,
			version: Number(snakelized.version),
			action: String(snakelized.action),
			currency: String(snakelized.currency),
			expired_date:
				snakelized.expired_date && snakelized.expired_date.toISOString(),
			language: snakelized.language && String(snakelized.language),
			paytypes: snakelized.paytypes && snakelized.paytypes.join(','),
			verifycode: snakelized.verifycode && String(snakelized.verifycode),
			split_rules:
				snakelized.split_rules && JSON.stringify(snakelized.split_rules),
			subscribe_date_start:
				snakelized.subscribe_date_start &&
				snakelized.subscribe_date_start.toISOString(),
			subscribe_periodicity:
				snakelized.subscribe_periodicity &&
				String(snakelized.subscribe_periodicity),
			recurringbytoken:
				snakelized.recurringbytoken && String(snakelized.recurringbytoken),
			dae: snakelized.dae && JSON.stringify(snakelized.dae),
		}
	})
export type LiqPayRawCheckoutRequest = z.infer<
	typeof LiqPayRawCheckoutRequestSchema
>
