import { objectToCamel } from 'ts-case-convert'
import { z } from 'zod'

import {
	parseBoolean,
	parseDate,
	parseOptional,
	parseString,
	removeUndefined,
} from '../../utils'
import {
	ActionSchema,
	BonusTypeSchema,
	CurrencySchema,
	LanguageSchema,
	LiqPayVersionSchema,
	MpiEciSchema,
	PaymentStatusSchema,
	PaytypeSchema,
	RequestResultSchema,
} from '../common/enums'

// TODO: check for optional fields on real api responses

/**
 * Raw response from LiqPay `status` API.
 *
 * ⚠️ Important:
 * - Field names are in `snake_case`
 * - Types are inconsistent (`string | number | boolean`)
 * - Dates are not parsed
 *
 * This schema reflects the API response **as-is**, without normalization.
 */
export const RawPaymentStatusResponseSchema = z.object({
	/**
	 * Acquirer ID
	 */
	acq_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Transaction type. Possible values:
	 * - `pay` - payment
	 * - `hold` - blocking funds on the sender's account
	 * - `paysplit` - splitting the payment
	 * - `subscribe` - creating a regular payment
	 * - `paydonate` - donation
	 * - `auth` - card pre-authorization
	 * - `regular` - regular payment
	 */
	action: z.string().optional(),

	/**
	 * Agent commission in payment currency
	 */
	agent_commission: z.number().optional(),

	/**
	 * Payment amount
	 */
	amount: z.number().optional(),

	/**
	 * Sender bonus in debit payment currency
	 */
	amount_bonus: z.number().optional(),

	/**
	 * Transaction amount credit in currency `currency_credit`
	 */
	amount_credit: z.number().optional(),

	/**
	 * Amount of debit transaction in currency `currency_debit`
	 */
	amount_debit: z.number().optional(),

	/**
	 * Authorization code for credit transaction
	 */
	authcode_credit: z.string().optional(),

	/**
	 * Authorization code for debit transaction
	 */
	authcode_debit: z.string().optional(),

	/**
	 * Discount amount in percentage
	 */
	bonus_procent: z.number().optional(),

	/**
	 * Bonus type, possible values: `bonusplus`, `discount_club`, `personal`, `promo`
	 */
	bonus_type: z.string().optional(),

	/**
	 * Sender card token
	 */
	card_token: z.string().optional(),

	/**
	 * Recipient fee in `currency_credit` currency
	 */
	commission_credit: z.number().optional(),

	/**
	 * Sender fee in `currency_debit`
	 */
	commission_debit: z.number().optional(),

	/**
	 * Payer's phone. An OTP payment confirmation password was sent to this number and the payer's LiqPay account was linked. The phone number is indicated in the international format (Ukraine `+380`). For example: +380950000001 (with +) or 380950000001 (without +)
	 */
	confirm_phone: z.string().optional(),

	/**
	 * Payment creation date
	 */
	create_date: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment currency
	 */
	currency: z.string().optional(),

	/**
	 * Transaction currency credit
	 */
	currency_credit: z.string().optional(),

	/**
	 * Transaction currency debit
	 */
	currency_debit: z.string().optional(),

	/**
	 * Payment comment
	 */
	description: z.string().optional(),

	/**
	 * Payment completion/change date
	 */
	end_date: z.union([z.number(), z.string()]).optional(),

	/**
	 * Additional payment information
	 */
	info: z.string().optional(),

	/**
	 * Sender IP address
	 */
	ip: z.string().optional(),

	/**
	 * Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
	 */
	is_3ds: z.union([z.string(), z.boolean()]).optional(),

	/**
	 * Client language: `uk`, `en`
	 */
	language: z.string().optional(),

	/**
	 * `Order_id` of payment in the LiqPay system
	 */
	liqpay_order_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment in installments sign
	 */
	moment_part: z.string().optional(),

	/**
	 * Represents whether 3D-Secure verification was performed during payment by code value. Possible values:
	 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
	 * - `6` - the payer's card issuer does not support 3D-Secure technology
	 * - `7` - the transaction was completed without 3D-Secure
	 */
	mpi_eci: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment `Order_id`
	 */
	order_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment ID in the LiqPay system
	 */
	payment_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment method. Possible values:
	 * - `card` - payment by card
	 * - `privat24` - through the Privat24 account
	 * - `moment_part` - installment
	 * - `invoice` - invoice to e-mail
	 * - `qr` - scan qr code
	 */
	paytype: z.string().optional(),

	/**
	 * Store public key
	 */
	public_key: z.string().optional(),

	/**
	 * Recipient fee in payment currency
	 */
	receiver_commission: z.number().optional(),

	/**
	 * Result of query execution: `ok`, `error`
	 */
	result: z.string().optional(),

	/**
	 * Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
	 */
	rrn_credit: z.string().optional(),

	/**
	 * Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
	 */
	rrn_debit: z.string().optional(),

	/**
	 * Sender bonus in payment currency
	 */
	sender_bonus: z.number().optional(),

	/**
	 * Sender's bank
	 */
	sender_card_bank: z.string().optional(),

	/**
	 * Country of the sender's card. Numeric `ISO 3166-1` code
	 */
	sender_card_country: z.union([z.number(), z.string()]).optional(),

	/**
	 * Sender's card
	 */
	sender_card_mask2: z.string().optional(),

	/**
	 * Sender's IBAN
	 */
	sender_iban: z.string().optional(),

	/**
	 * Sender's card type MC/Visa
	 */
	sender_card_type: z.string().optional(),

	/**
	 * Sender's fee in payment currency
	 */
	sender_commission: z.number().optional(),

	/**
	 * Sender's first name
	 */
	sender_first_name: z.string().optional(),

	/**
	 * Sender's last name
	 */
	sender_last_name: z.string().optional(),

	/**
	 * Sender's phone number
	 */
	sender_phone: z.string().optional(),

	/**
	 * Payment status
	 */
	status: z.string().optional(),

	/**
	 * An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
	 */
	wait_reserve_status: z.union([z.string(), z.boolean()]).optional(),

	/**
	 * Transaction ID in the LiqPay system
	 */
	transaction_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Payment type
	 */
	type: z.string().optional(),

	/**
	 * API version. Current value is `7`
	 */
	version: z.number().optional(),
})

/**
 * Raw (unprocessed) payment status response.
 */
export type RawPaymentStatusResponse = z.infer<
	typeof RawPaymentStatusResponseSchema
>

/**
 * Normalized payment status response.
 *
 * This schema:
 * - converts keys to `camelCase`
 * - normalizes primitive types
 * - parses dates
 * - validates enums
 * - removes `undefined` fields
 */
export const PaymentStatusResponseSchema =
	RawPaymentStatusResponseSchema.transform(raw => {
		const camelized = objectToCamel(raw)
		const transformed = {
			...camelized,

			/**
			 * Acquirer ID
			 */
			acqId: parseString(camelized.acqId),

			/**
			 * Transaction type. Possible values:
			 * - `pay` - payment
			 * - `hold` - blocking funds on the sender's account
			 * - `paysplit` - splitting the payment
			 * - `subscribe` - creating a regular payment
			 * - `paydonate` - donation
			 * - `auth` - card pre-authorization
			 * - `regular` - regular payment
			 */
			action: parseOptional(camelized.action, ActionSchema),

			/**
			 * Bonus type, possible values: `bonusplus`, `discount_club`, `personal`, `promo`
			 */
			bonusType: parseOptional(camelized.bonusType, BonusTypeSchema),

			/**
			 * Payment creation date
			 */
			createDate: parseDate(camelized.createDate),

			/**
			 * Payment currency
			 */
			currency: parseOptional(camelized.currency, CurrencySchema),

			/**
			 * Transaction currency credit
			 */
			currencyCredit: parseOptional(camelized.currencyCredit, CurrencySchema),

			/**
			 * Transaction currency debit
			 */
			currencyDebit: parseOptional(camelized.currencyDebit, CurrencySchema),

			/**
			 * Payment completion/change date
			 */
			endDate: parseDate(camelized.endDate),

			/**
			 * Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
			 */
			is3ds: parseBoolean(camelized.is3ds),

			/**
			 * Client language: `uk`, `en`
			 */
			language: parseOptional(camelized.language, LanguageSchema),

			/**
			 * `OrderId` of payment in the LiqPay system
			 */
			liqpayOrderId: parseString(camelized.liqpayOrderId),

			/**
			 * Payment in installments sign
			 */
			momentPart: parseBoolean(camelized.momentPart),

			/**
			 * Represents whether 3D-Secure verification was performed during payment by code value. Possible values:
			 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
			 * - `6` - the payer's card issuer does not support 3D-Secure technology
			 * - `7` - the transaction was completed without 3D-Secure
			 */
			mpiEci: parseOptional(String(camelized.mpiEci), MpiEciSchema),

			/**
			 * Payment `OrderId`
			 */
			orderId: parseString(camelized.orderId),

			/**
			 * Payment ID in the LiqPay system
			 */
			paymentId: parseString(camelized.paymentId),

			/**
			 * Payment method. Possible values:
			 * - `card` - payment by card
			 * - `privat24` - through the Privat24 account
			 * - `moment_part` - installment
			 * - `invoice` - invoice to e-mail
			 * - `qr` - scan qr code
			 */
			paytype: parseOptional(camelized.paytype, PaytypeSchema),

			/**
			 * Result of query execution: `ok`, `error`
			 */
			result: parseOptional(camelized.result, RequestResultSchema),

			/**
			 * Payment status
			 */
			status: parseOptional(camelized.status, PaymentStatusSchema),

			/**
			 * An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
			 */
			waitReserveStatus: parseBoolean(camelized.waitReserveStatus),

			/**
			 * Transaction ID in the LiqPay system
			 */
			transactionId: parseString(camelized.transactionId),

			/**
			 * API version. Current value is `7`
			 */
			version: parseOptional(camelized.version, LiqPayVersionSchema),
		}
		return removeUndefined(transformed)
	})

/**
 * Final, fully normalized payment status response.
 *
 * Use this type in application code instead of raw API response.
 */
export type PaymentStatusResponse = z.infer<typeof PaymentStatusResponseSchema>
