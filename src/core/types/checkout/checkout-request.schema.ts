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
	DetailAddendaSchema,
	FiscalDataSchema,
	SplitRuleSchema,
} from '../common'
import {
	ActionSchema,
	CurrencySchema,
	LanguageSchema,
	LiqPayVersionSchema,
	PaytypeSchema,
	SubscribePeriodicitySchema,
} from '../common/enums'

export const CheckoutRequestSchema = z.object({
	// MAIN PARAMS
	version: LiqPayVersionSchema.optional(),
	publicKey: z.string().optional(),
	action: ActionSchema,
	amount: z.number().positive(),
	cardToken: z.string().optional(),
	currency: CurrencySchema,
	description: z.string(),
	ip: z.string().optional(),
	orderId: z.string().max(255),
	rroInfo: FiscalDataSchema.optional(),
	expiredDate: z.date().optional(),
	language: LanguageSchema.optional(),
	paytypes: z.array(PaytypeSchema).optional(),
	resultUrl: z.string().max(510).optional(),
	serverUrl: z.string().max(510).optional(),
	verifycode: z.boolean().optional(),
	splitRules: z.array(SplitRuleSchema).optional(),

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
	subscribePeriodicity: SubscribePeriodicitySchema.optional(),

	// ONE CLICK PAYMENT PARAMS
	customer: z.string().max(100).optional(),
	recurringbytoken: z.boolean().optional(),
	customerUserId: z.string().optional(),

	// OTHER PARAMS
	dae: DetailAddendaSchema.optional(),
	info: z.string().optional(),
	productCategory: z.string().max(25).optional(),
	productDescription: z.string().max(500).optional(),
	productName: z.string().max(100).optional(),
	productUrl: z.string().max(510).optional(),
})
export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>

export const RawCheckoutRequestSchema = CheckoutRequestSchema.transform(
	typed => {
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
	},
)
export type RawCheckoutRequest = z.infer<typeof RawCheckoutRequestSchema>
