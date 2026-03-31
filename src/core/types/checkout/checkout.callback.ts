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
	CurrencySchema,
	LiqPayVersionSchema,
	MpiEciSchema,
	PaymentStatusSchema,
	PaytypeSchema,
} from '../common/enums'
import { LiqPayErrorCodeSchema } from '../error'

// TODO: check for optional fields on real api callbacks

/**
 * Raw (non-normalized) LiqPay checkout callback payload.
 *
 * ⚠️ Notes:
 * - All fields are in snake_case
 * - Types are inconsistent (string | number | boolean)
 * - Some fields may be missing depending on payment flow
 * - Should NOT be used directly in application logic
 */
export const RawCheckoutCallbackSchema = z.object({
	/**
	 * API version. Current value is `7`
	 */
	version: z.number().optional(),

	/**
	 * Store public key
	 */
	public_key: z.string().optional(),

	/**
	 * Acquirer ID
	 */
	acq_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Operation type. Possible values:
	 * - `pay` - payment
	 * - `hold` - blocking of funds on the sender's account
	 * - `subscribe` - creation of a regular payment
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
	 * Transaction amount debit in currency `currency_debit`
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
	 * Date of debiting funds
	 */
	completion_date: z.string().optional(),

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
	 * A unique user identifier on the merchant's website. Maximum length __100__ characters.
	 */
	customer: z.string().max(100).optional(),

	/**
	 * Payment comment
	 */
	description: z.string().optional(),

	/**
	 * Payment completion/change date
	 */
	end_date: z.union([z.number(), z.string()]).optional(),

	/**
	 * Error code
	 */
	err_code: z.string().optional(),

	/**
	 * Error description
	 */
	err_description: z.string().optional(),

	/**
	 * Additional payment information
	 */
	info: z.string().optional(),

	/**
	 * Sender IP address
	 */
	ip: z.string().optional(),

	/**
	 * Represents whether 3D-Secure verification was performed during payment. Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
	 */
	is_3ds: z.union([z.string(), z.boolean()]).optional(),

	/**
	 * `Order_id` of payment in the LiqPay system
	 */
	liqpay_order_id: z.union([z.number(), z.string()]).optional(),

	/**
	 * Code that represents whether 3D-Secure verification was performed during payment. Possible values:
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
	 * - card - payment by card
	 * - privat24 - through the Privat24 account
	 * - moment_part - installment
	 * - invoice - invoice to e-mail
	 * - qr - scan qr code
	 */
	paytype: z.string().optional(),

	/**
	 * Recipient fee in payment currency
	 */
	receiver_commission: z.number().optional(),

	/**
	 * Link to which the client must be redirected to complete 3DS verification
	 */
	redirect_to: z.string().optional(),

	/**
	 * Date of last payment refund
	 */
	refund_date_last: z.string().optional(),

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
	 * Sender's card mask
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
	 * Payment Token
	 */
	token: z.string().optional(),

	/**
	 * Payment type
	 */
	type: z.string().optional(),

	/**
	 * Error code
	 */
	err_erc: z.string().optional(),

	/**
	 * Product category
	 */
	product_category: z.string().optional(),

	/**
	 * Product description
	 */
	product_description: z.string().optional(),

	/**
	 * Product name
	 */
	product_name: z.string().optional(),

	/**
	 * Product page address
	 */
	product_url: z.string().optional(),

	/**
	 * Refund amount
	 */
	refund_amount: z.number().optional(),

	/**
	 * Verification code
	 */
	verifycode: z.string().optional(),
})

/**
 * Type of raw LiqPay callback.
 */
export type RawCheckoutCallback = z.infer<typeof RawCheckoutCallbackSchema>

/**
 * Normalized checkout callback.
 *
 * What this schema does:
 * - Converts keys from snake_case → camelCase
 * - Normalizes types (string → number/date/boolean)
 * - Validates enums
 * - Removes undefined fields
 *
 * Safe to use in business logic.
 */
export const CheckoutCallbackSchema = RawCheckoutCallbackSchema.transform(
	raw => {
		const camelized = objectToCamel(raw)
		const transformed = {
			...camelized,

			/**
			 * API version. Current value is `7`
			 */
			version: parseOptional(LiqPayVersionSchema, camelized.version),

			/**
			 * Acquirer ID
			 */
			acqId: parseString(camelized.acqId),

			/**
			 * Operation type. Possible values:
			 * - `pay` - payment
			 * - `hold` - blocking of funds on the sender's account
			 * - `subscribe` - creation of a regular payment
			 * - `regular` - regular payment
			 */
			action: parseOptional(
				ActionSchema.extract(['pay', 'hold', 'subscribe', 'regular']),
				camelized.action,
			),

			/**
			 * Date of debiting funds
			 */
			completionDate: parseDate(camelized.completionDate),

			/**
			 * Payment creation date
			 */
			createDate: parseDate(camelized.createDate),

			/**
			 * Payment currency
			 */
			currency: parseOptional(CurrencySchema, camelized.currency),

			/**
			 * Transaction currency credit
			 */
			currencyCredit: parseOptional(CurrencySchema, camelized.currencyCredit),

			/**
			 * Transaction currency debit
			 */
			currencyDebit: parseOptional(CurrencySchema, camelized.currencyDebit),

			/**
			 * Payment completion/change date
			 */
			endDate: parseDate(camelized.endDate),

			/**
			 * Error code
			 */
			errCode: parseOptional(LiqPayErrorCodeSchema, camelized.errCode),

			/**
			 * Represents whether 3D-Secure verification was performed during payment. Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
			 */
			is3ds: parseBoolean(camelized.is3ds),

			/**
			 * `Order_id` of payment in the LiqPay system
			 */
			liqpayOrderId: parseString(camelized.liqpayOrderId),

			/**
			 * Code that represents whether 3D-Secure verification was performed during payment. Possible values:
			 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
			 * - `6` - the payer's card issuer does not support 3D-Secure technology
			 * - `7` - the transaction was completed without 3D-Secure
			 */
			mpiEci: parseOptional(MpiEciSchema, String(camelized.mpiEci)),

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
			 * - `masterpass` - through the Masterpass account
			 * - `moment_part` - installment
			 * - `cash` - by cash
			 * - `invoice` - invoice to e-mail
			 * - `qr` - by scanning qr code
			 */
			paytype: parseOptional(
				PaytypeSchema.extract([
					'card',
					'privat24',
					'masterpass',
					'moment_part',
					'cash',
					'invoice',
					'qr',
				]),
				camelized.paytype,
			),

			/**
			 * Date of last payment refund
			 */
			refundDateLast: parseDate(camelized.refundDateLast),

			/**
			 * Payment status
			 */
			status: parseOptional(PaymentStatusSchema, camelized.status),

			/**
			 * An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
			 */
			waitReserveStatus: parseBoolean(camelized.waitReserveStatus),
		}
		return removeUndefined(transformed)
	},
)

/**
 * Type of normalized checkout callback.
 * - Fully parsed
 * - Type-safe
 * - Ready for backend logic
 */
export type CheckoutCallback = z.infer<typeof CheckoutCallbackSchema>
