import { objectToCamel } from 'ts-case-convert'
import { z } from 'zod'

import { parseBoolean, parseDate, parseOptional } from '../../utils'
import {
	LiqPayActionSchema,
	LiqPayBonusTypeSchema,
	LiqPayCurrencySchema,
	LiqPayLanguageSchema,
	LiqPayMpiEciSchema,
	LiqPayPaymentStatusSchema,
	LiqPayPaytypeSchema,
	LiqPayRequestResultSchema,
	LiqPayVersionSchema,
} from '../common/enums'

// TODO: check for optional fields on real api responses
export const LiqPayRawPaymentStatusResponseSchema = z.object({
	acq_id: z.number().optional(),
	action: z.string().optional(),
	agent_commission: z.number().optional(),
	amount: z.number().optional(),
	amount_bonus: z.number().optional(),
	amount_credit: z.number().optional(),
	amount_debit: z.number().optional(),
	authcode_credit: z.string().optional(),
	authcode_debit: z.string().optional(),
	bonus_procent: z.number().optional(),
	bonus_type: z.string().optional(),
	card_token: z.string().optional(),
	commission_credit: z.number().optional(),
	commission_debit: z.number().optional(),
	confirm_phone: z.string().optional(),
	create_date: z.string().optional(),
	currency: z.string().optional(),
	currency_credit: z.string().optional(),
	currency_debit: z.string().optional(),
	description: z.string().optional(),
	end_date: z.string().optional(),
	info: z.string().optional(),
	ip: z.string().optional(),
	is_3ds: z.union([z.string(), z.boolean()]).optional(),
	language: z.string().optional(),
	liqpay_order_id: z.string().optional(),
	moment_part: z.string().optional(),
	mpi_eci: z.number().optional(),
	order_id: z.string().optional(),
	payment_id: z.number().optional(),
	paytype: z.string().optional(),
	public_key: z.string().optional(),
	receiver_commission: z.number().optional(),
	result: z.string().optional(),
	rrn_credit: z.string().optional(),
	rrn_debit: z.string().optional(),
	sender_bonus: z.number().optional(),
	sender_card_bank: z.string().optional(),
	sender_card_country: z.string().optional(),
	sender_card_mask2: z.string().optional(),
	sender_iban: z.string().optional(),
	sender_card_type: z.string().optional(),
	sender_commission: z.number().optional(),
	sender_first_name: z.string().optional(),
	sender_last_name: z.string().optional(),
	sender_phone: z.string().optional(),
	status: z.string().optional(),
	wait_reserve_status: z.union([z.string(), z.boolean()]).optional(),
	transaction_id: z.number().optional(),
	type: z.string().optional(),
	version: z.number().optional(),
})
export type LiqPayRawPaymentStatusResponse = z.infer<
	typeof LiqPayRawPaymentStatusResponseSchema
>

export const LiqPayPaymentStatusResponseSchema =
	LiqPayRawPaymentStatusResponseSchema.transform(raw => {
		const camelized = objectToCamel(raw)
		return {
			...camelized,
			action: parseOptional(LiqPayActionSchema, camelized.action),
			bonusType: parseOptional(LiqPayBonusTypeSchema, camelized.bonusType),
			createDate: parseDate(camelized.createDate),
			currency: parseOptional(LiqPayCurrencySchema, camelized.currency),
			currencyCredit: parseOptional(
				LiqPayCurrencySchema,
				camelized.currencyCredit,
			),
			currencyDebit: parseOptional(
				LiqPayCurrencySchema,
				camelized.currencyDebit,
			),
			endDate: parseDate(camelized.endDate),
			is3ds: parseBoolean(camelized.is3ds),
			language: parseOptional(LiqPayLanguageSchema, camelized.language),
			momentPart: parseBoolean(camelized.momentPart),
			mpiEci: parseOptional(LiqPayMpiEciSchema, camelized.mpiEci),
			paytype: parseOptional(LiqPayPaytypeSchema, camelized.paytype),
			result: parseOptional(LiqPayRequestResultSchema, camelized.result),
			status: parseOptional(LiqPayPaymentStatusSchema, camelized.status),
			waitReserveStatus: parseBoolean(camelized.waitReserveStatus),
			version: parseOptional(LiqPayVersionSchema, camelized.version),
		}
	})
export type LiqPayPaymentStatusResponse = z.infer<
	typeof LiqPayPaymentStatusResponseSchema
>
