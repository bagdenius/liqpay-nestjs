import { objectToSnake } from 'ts-case-convert'
import z from 'zod'

import {
	boolTo,
	dateToIso,
	join,
	removeUndefined,
	stringify,
} from '../../utils'
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
	version: LiqPayVersionSchema.optional(),
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
	verifycode: z.boolean().optional(),
	splitRules: z.array(LiqPaySplitRuleSchema).optional(),

	// SENDER PARAMS
	senderAddress: z.string().optional(),
	senderCity: z.string().optional(),
	senderCountryCode: z.string().optional(),
	senderFirstName: z.string().optional(),
	senderLastName: z.string().optional(),
	senderPostalCode: z.string().optional(),

	// SUBSCRIPTION PARAMS
	subscribe: z.boolean().optional(),
	subscribeDateStart: z.date().optional(),
	subscribePeriodicity: LiqPaySubscribePeriodicitySchema.optional(),

	// ONE CLICK PAYMENT PARAMS
	customer: z.string().max(100).optional(),
	recurringbytoken: z.boolean().optional(),
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
		const transformed = {
			...snakelized,
			expired_date: dateToIso(snakelized.expired_date),
			paytypes: join(snakelized.paytypes),
			verifycode: boolTo(snakelized.verifycode, 'Y'),
			split_rules: stringify(snakelized.split_rules),
			subscribe: boolTo(snakelized.subscribe, '1'),
			subscribe_date_start: dateToIso(snakelized.subscribe_date_start),
			recurringbytoken: boolTo(snakelized.recurringbytoken, '1'),
			dae: stringify(snakelized.dae),
		}
		return removeUndefined(transformed)
	})
export type LiqPayRawCheckoutRequest = z.infer<
	typeof LiqPayRawCheckoutRequestSchema
>
