import { objectToCamel } from 'ts-case-convert'
import { z } from 'zod'

import {
	parseBoolean,
	parseDate,
	parseOptional,
	removeUndefined,
} from '../../utils'
import {
	LiqPayActionSchema,
	LiqPayCurrencySchema,
	LiqPayMpiEciSchema,
	LiqPayPaymentStatusSchema,
	LiqPayPaytypeSchema,
	LiqPayVersionSchema,
} from '../common/enums'
import { LiqPayErrorCodeSchema } from '../error'

// TODO: check for optional fields on real api callbacks
export const LiqPayRawCheckoutCallbackSchema = z.object({
	version: z.number().optional(),
	public_key: z.string().optional(),
	acq_id: z.number().optional(),
	action: z.string().optional(),
	agent_commission: z.number().optional(),
	amount: z.number().optional(),
	amount_bonus: z.number().optional(),
	amount_credit: z.number().optional(),
	amount_debit: z.number().optional(),
	authcode_credit: z.string().optional(),
	authcode_debit: z.string().optional(),
	card_token: z.string().optional(),
	commission_credit: z.number().optional(),
	commission_debit: z.number().optional(),
	completion_date: z.string().optional(),
	create_date: z.union([z.number(), z.string()]).optional(),
	currency: z.string().optional(),
	currency_credit: z.string().optional(),
	currency_debit: z.string().optional(),
	customer: z.string().max(100).optional(),
	description: z.string().optional(),
	end_date: z.union([z.number(), z.string()]).optional(),
	err_code: z.string().optional(),
	err_description: z.string().optional(),
	info: z.string().optional(),
	ip: z.string().optional(),
	is_3ds: z.union([z.string(), z.boolean()]).optional(),
	liqpay_order_id: z.string().optional(),
	mpi_eci: z.union([z.number(), z.string()]).optional(),
	order_id: z.string().optional(),
	payment_id: z.number().optional(),
	paytype: z.string().optional(),
	receiver_commission: z.number().optional(),
	redirect_to: z.string().optional(),
	refund_date_last: z.string().optional(),
	rrn_credit: z.string().optional(),
	rrn_debit: z.string().optional(),
	sender_bonus: z.number().optional(),
	sender_card_bank: z.string().optional(),
	sender_card_country: z.union([z.number(), z.string()]).optional(),
	sender_card_mask2: z.string().optional(),
	sender_iban: z.string().optional(),
	sender_card_type: z.string().optional(),
	sender_commission: z.number().optional(),
	sender_first_name: z.string().optional(),
	sender_last_name: z.string().optional(),
	sender_phone: z.string().optional(),
	status: z.string().optional(),
	wait_reserve_status: z.union([z.string(), z.boolean()]).optional(),
	token: z.string().optional(),
	type: z.string().optional(),
	err_erc: z.string().optional(),
	product_category: z.string().optional(),
	product_description: z.string().optional(),
	product_name: z.string().optional(),
	product_url: z.string().optional(),
	refund_amount: z.number().optional(),
	verifycode: z.string().optional(),
})
export type LiqPayRawCheckoutCallback = z.infer<
	typeof LiqPayRawCheckoutCallbackSchema
>

export const LiqPayCheckoutCallbackSchema =
	LiqPayRawCheckoutCallbackSchema.transform(raw => {
		const camelized = objectToCamel(raw)
		const transformed = {
			...camelized,
			version: parseOptional(LiqPayVersionSchema, camelized.version),
			action: parseOptional(LiqPayActionSchema, camelized.action),
			completionDate: parseDate(camelized.completionDate),
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
			errCode: parseOptional(LiqPayErrorCodeSchema, camelized.errCode),
			is3ds: parseBoolean(camelized.is3ds),
			mpiEci: parseOptional(LiqPayMpiEciSchema, String(camelized.mpiEci)),
			paytype: parseOptional(LiqPayPaytypeSchema, camelized.paytype),
			refundDateLast: parseDate(camelized.refundDateLast),
			status: parseOptional(LiqPayPaymentStatusSchema, camelized.status),
			waitReserveStatus: parseBoolean(camelized.waitReserveStatus),
		}
		return removeUndefined(transformed)
	})
export type LiqPayCheckoutCallback = z.infer<
	typeof LiqPayCheckoutCallbackSchema
>
