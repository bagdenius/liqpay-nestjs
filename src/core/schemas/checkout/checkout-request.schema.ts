import z from 'zod'

import { LiqPayBaseSchema } from '../base'
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
} from '../common/enums'

export const LiqPayCheckoutRequestSchema = LiqPayBaseSchema.extend({
	// MAIN PARAMS
	version: z.literal(7),
	public_key: z.string(),
	action: LiqPayActionSchema,
	amount: z.number().positive(),
	currency: LiqPayCurrencySchema,
	description: z.string(),
	order_id: z.string().max(255),
	rro_info: LiqPayFiscalDataSchema.optional(),
	expired_date: z.date().optional(),
	language: LiqPayLanguageSchema.optional(),
	paytypes: z.array(LiqPayPaytypeSchema).optional(),
	result_url: z.string().max(510).optional(),
	server_url: z.string().max(510).optional(),
	verifycode: z.literal('Y').optional(),
	split_rules: z.array(LiqPaySplitRuleSchema).optional(),

	// SENDER PARAMS
	sender_address: z.string().optional(),
	sender_city: z.string().optional(),
	sender_country_code: z.string().optional(),
	sender_first_name: z.string().optional(),
	sender_last_name: z.string().optional(),
	sender_postal_code: z.string().optional(),

	// SUBSCRIPTION PARAMS
	subscribe: z.literal('1').optional(),
	subscribe_date_start: z.date().optional(),
	subscribe_periodicity: LiqPaySubscribePeriodicitySchema.optional(),

	// ONE CLICK PAYMENT PARAMS
	customer: z.string().max(100).optional(),
	recurringbytoken: z.literal('1').optional(),
	customer_user_id: z.string().optional(),

	// OTHER PARAMS
	dae: LiqPayDetailAddendaSchema.optional(),
	info: z.string().optional(),
	product_category: z.string().max(25).optional(),
	product_description: z.string().max(500).optional(),
	product_name: z.string().max(100).optional(),
	product_url: z.string().max(510).optional(),
})

export type LiqPayCheckoutRequest = z.infer<typeof LiqPayCheckoutRequestSchema>
