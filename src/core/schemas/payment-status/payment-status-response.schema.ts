import { objectToCamel, objectToSnake } from 'ts-case-convert'
import { z } from 'zod'

import { toBoolean } from '../../utils'
import { LiqPayBaseSchema } from '../base'
import {
	LiqPayActionSchema,
	LiqPayBonusTypeSchema,
	LiqPayCurrencySchema,
	LiqPayLanguageSchema,
	LiqPayMpiEciSchema,
	LiqPayPaymentStatusSchema,
	LiqPayPaytypeSchema,
	LiqPayRequestResultSchema,
} from '../common/enums'

export const LiqPayRawPaymentStatusResponseSchema = LiqPayBaseSchema.extend({
	acq_id: z.number(),
	action: z.string(),
	agent_commission: z.number(),
	amount: z.number(),
	amount_bonus: z.number(),
	amount_credit: z.number(),
	amount_debit: z.number(),
	authcode_credit: z.string(),
	authcode_debit: z.string(),
	bonus_procent: z.number(),
	bonus_type: z.string(),
	card_token: z.string(),
	commission_credit: z.number(),
	commission_debit: z.number(),
	confirm_phone: z.string(),
	create_date: z.string(),
	currency: z.string(),
	currency_credit: z.string(),
	currency_debit: z.string(),
	description: z.string(),
	end_date: z.string(),
	info: z.string(),
	ip: z.string(),
	is_3ds: z.union([z.string(), z.boolean()]),
	language: z.string(),
	liqpay_order_id: z.string(),
	moment_part: z.string(),
	mpi_eci: z.number(),
	order_id: z.string(),
	payment_id: z.number(),
	paytype: z.string(),
	receiver_commission: z.number(),
	result: z.string(),
	rrn_credit: z.string(),
	rrn_debit: z.string(),
	sender_bonus: z.number(),
	sender_card_bank: z.string(),
	sender_card_country: z.string(),
	sender_card_mask2: z.string(),
	sender_iban: z.string(),
	sender_card_type: z.string(),
	sender_commission: z.number(),
	sender_first_name: z.string(),
	sender_last_name: z.string(),
	sender_phone: z.string(),
	status: z.string(),
	wait_reserve_status: z.union([z.string(), z.boolean()]),
	transaction_id: z.number(),
	type: z.string(),
	version: z.number(),
})

export type LiqPayRawPaymentStatusResponse = z.infer<
	typeof LiqPayRawPaymentStatusResponseSchema
>

export const LiqPayPaymentStatusResponseSchema =
	LiqPayRawPaymentStatusResponseSchema.transform(raw => {
		const camelized = objectToCamel(raw)
		return {
			...camelized,
			action: LiqPayActionSchema.parse(camelized.action),
			bonusType: LiqPayBonusTypeSchema.parse(camelized.bonusType),
			createDate: toDate(camelized.createDate),
			currency: LiqPayCurrencySchema.parse(camelized.currency),
			currencyCredit: LiqPayCurrencySchema.parse(camelized.currencyCredit),
			currencyDebit: LiqPayCurrencySchema.parse(camelized.currencyDebit),
			endDate: toDate(camelized.endDate),
			is3DSecure: toBoolean(camelized.is3ds),
			language: LiqPayLanguageSchema.parse(camelized.language),
			momentPart: toBoolean(camelized.momentPart),
			mpiEci: LiqPayMpiEciSchema.parse(camelized.mpiEci),
			paytype: LiqPayPaytypeSchema.parse(camelized.paytype),
			result: LiqPayRequestResultSchema.parse(camelized.result),
			status: LiqPayPaymentStatusSchema.parse(camelized.status),
			waitReserveStatus: toBoolean(camelized.waitReserveStatus),
		}
	})
