import { objectToCamel } from 'ts-case-convert'
import { z } from 'zod'

import { toBoolean } from '../../utils'
import { LiqPayBaseSchema } from '../base'
import {
	LiqPayActionSchema,
	LiqPayCurrencySchema,
	LiqPayErrorCodeSchema,
	LiqPayMpiEciSchema,
	LiqPayPaymentStatusSchema,
	LiqPayPaytypeSchema,
} from '../common/enums'

export const LiqPayRawCheckoutCallbackSchema = LiqPayBaseSchema.extend({
	acq_id: z.number(),
	action: z.string(),
	agent_commission: z.number(),
	amount: z.number(),
	amount_bonus: z.number(),
	amount_credit: z.number(),
	amount_debit: z.number(),
	authcode_credit: z.string(),
	authcode_debit: z.string(),
	card_token: z.string(),
	commission_credit: z.number(),
	commission_debit: z.number(),
	completion_date: z.string(),
	create_date: z.string(),
	currency: z.string(),
	currency_credit: z.string(),
	currency_debit: z.string(),
	customer: z.string().max(100),
	description: z.string(),
	end_date: z.string(),
	err_code: z.string(),
	err_description: z.string(),
	info: z.string(),
	ip: z.string(),
	is_3ds: z.union([z.string(), z.boolean()]),
	liqpay_order_id: z.string(),
	mpi_eci: z.number(),
	order_id: z.string(),
	payment_id: z.number(),
	paytype: z.string(),
	receiver_commission: z.number(),
	redirect_to: z.string(),
	refund_date_last: z.string(),
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
	token: z.string(),
	type: z.string(),
	err_erc: z.string(),
	product_category: z.string(),
	product_description: z.string(),
	product_name: z.string(),
	product_url: z.string(),
	refund_amount: z.number(),
	verifycode: z.string().optional(),
})

export type LiqPayRawCheckoutCallback = z.infer<
	typeof LiqPayRawCheckoutCallbackSchema
>

export const LiqPayCheckoutCallbackSchema =
	LiqPayRawCheckoutCallbackSchema.transform(raw => {
		const camelized = objectToCamel(raw)
		return {
			...camelized,
			action: LiqPayActionSchema.parse(camelized.action),
			completionDate: toDate(camelized.completionDate),
			createDate: toDate(camelized.createDate),
			currency: LiqPayCurrencySchema.parse(camelized.currency),
			currencyCredit: LiqPayCurrencySchema.parse(camelized.currencyCredit),
			currencyDebit: LiqPayCurrencySchema.parse(camelized.currencyDebit),
			endDate: toDate(camelized.endDate),
			errorCode: LiqPayErrorCodeSchema.parse(camelized.errCode),
			is3DSecure: toBoolean(camelized.is3ds),
			mpiEci: LiqPayMpiEciSchema.parse(camelized.mpiEci),
			paytype: LiqPayPaytypeSchema.parse(camelized.paytype),
			refundDateLast: toDate(camelized.refundDateLast),
			status: LiqPayPaymentStatusSchema.parse(camelized.status),
			waitReserveStatus: toBoolean(camelized.waitReserveStatus),
		}
	})

export type LiqPayCheckoutCallback = z.infer<
	typeof LiqPayCheckoutCallbackSchema
>
