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
	Action,
	CurrencySchema,
	LanguageSchema,
	LiqPayVersion,
	PaytypeSchema,
	SubscribePeriodicitySchema,
} from '../common/enums'

/**
 * Public layer - what library user provides
 * These are the fields user can actually fill
 */
export const CheckoutInputSchema = z.object({
	/**
	 * Payment amount. For example: `5`, `7.34`
	 */
	amount: z.number().positive(),

	cardToken: z.string().optional(),

	/**
	 * Payment currency. Possible values: `USD`, `EUR`, `UAH`
	 */
	currency: CurrencySchema,

	/**
	 * Payment purpose
	 */
	description: z.string(),

	ip: z.string().optional(),

	/**
	 * Unique purchase ID in your store. Maximum length __255__ characters
	 */
	orderId: z.string().max(255),

	/**
	 * Data for fiscalization (rro_info)
	 */
	fiscalData: FiscalDataSchema.optional(),

	/**
	 * The time by which the customer can pay the invoice in `UTC`. Transmitted in the format `2016-04-24 00:00:00`
	 */
	expiredDate: z.date().optional(),

	/**
	 * Client language: `uk`, `en`
	 */
	language: LanguageSchema.optional(),

	/**
	 * Parameter that transmits payment methods to be displayed at checkout.
	 * If the parameter is not provided, the store settings are applied. Possible values:
	 * - `apay` - Apple Pay
	 * - `gpay` - Google Pay
	 * - `card` - card payment
	 * - `privat24` - via Privat24 account
	 * - `moment_part` - installments
	 * - `paypart` - payment in parts
	 * - `cash` - cash
	 * - `invoice` - invoice to e-mail
	 * - `qr` - scanning a QR code
	 */
	paytypes: z.array(PaytypeSchema).optional(),

	/**
	 * The URL in your store to which the buyer will be redirected after completing the purchase. Maximum length __510__ characters
	 */
	resultUrl: z.string().max(510).optional(),

	/**
	 * API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
	 */
	serverUrl: z.string().max(510).optional(),

	/**
	 * Possible value `Y`. Dynamic verification code, generated and returned in `Callback`. Similarly, the generated code will be passed in the verification transaction to be displayed in the client's card statement. Works for `action = auth` (verifycode)
	 */
	verifyCode: z.boolean().optional(),

	/**
	 * Payment with splitting the amount into several recipients. This parameter specifies a `JSON` array with payment splitting rules.
	 * One debit is made from the client and several credits are made to the recipients. If you need to transfer your purpose for each amount, use the `description` parameter.
	 * If you need to fiscalize payments for each recipient, add the `rro_info` object. The acquiring fee is charged for each recipient.
	 */
	splitRules: z.array(SplitRuleSchema).optional(),

	/**
	 * Sender address
	 */
	senderAddress: z.string().optional(),

	/**
	 * Sender city
	 */
	senderCity: z.string().optional(),

	/**
	 * Sender country code. Numeric __ISO 3166-1__ code
	 */
	senderCountryCode: z.string().optional(),

	/**
	 * Sender first name
	 */
	senderFirstName: z.string().optional(),

	/**
	 * Sender's last name
	 */
	senderLastName: z.string().optional(),

	/**
	 * Sender's postal code
	 */
	senderPostalCode: z.string().optional(),

	/**
	 * Regular payment. Possible values: `1`
	 */
	subscribe: z.boolean().optional(),

	/**
	 * Date of first payment. The time must be specified in the format `2015-03-31 00:00:00` in `UTC`. If the date is past, the subscription will be activated from the current date of receipt of the request
	 */
	subscribeDateStart: z.date().optional(),

	/**
	 * The frequency of funds write-off. Possible values:
	 * - `day` - daily
	 * - `week` - weekly
	 * - `month` - once a month
	 * - `year` - once a year, раз
	 */
	subscribePeriodicity: SubscribePeriodicitySchema.optional(),

	/**
	 * Unique client identifier on the merchant's website. When transmitting the parameter, LiqPay remembers the client's payment details and his identifier - further payment can be made in 1 click. Maximum length __100__ characters. (When using the parameter for __Masterpass 1 click__, a valid payer's phone number is transmitted in this field)
	 */
	customer: z.string().max(100).optional(),

	/**
	 * Allows you to generate a `card_token` of the payer, which you will receive in a callback request to `server_url`. `card_token` allows you to make payments without entering the payer's card details, using the token payment API - that is, in 1 click. To receive `card_token`, you must pass the value: `1` in the request (recurringbytoken)
	 */
	recurringByToken: z.boolean().optional(),

	/**
	 * User ID in the merchant system, transmitted with each user payment (must not match `customer`, used for payment using the __Masterpass 1 click__ wallet)
	 */
	customerUserId: z.string().optional(),

	/**
	 * Long Detail Addenda entry. __Required for merchants with MCC 4511__.
	 *
	 * The `dae` parameter is a `JSON` string to which `base64` has been applied.
	 * It can contain the parameters given in the example below. (dae)
	 */
	detailAddenda: DetailAddendaSchema.optional(),

	/**
	 * Information to add data to the payment. For example: `"External information for payments"`
	 */
	info: z.string().optional(),

	/**
	 * Product category. Maximum length `25` characters
	 */
	productCategory: z.string().max(25).optional(),

	/**
	 * Product description. Maximum length `500` characters.
	 */
	productDescription: z.string().max(500).optional(),

	/**
	 * Product name. Maximum length `100` characters.
	 */
	productName: z.string().max(100).optional(),

	/**
	 * Product page address. Maximum length `510` characters
	 */
	productUrl: z.string().max(510).optional(),
})

/**
 * Contract of data that is passed when forming a payment request as `base64` encoded string data when calling the LiqPay API
 */
export type CheckoutInput = z.infer<typeof CheckoutInputSchema>

/**
 * Internal layer - full object inside the library
 * Includes version, publicKey, action — set internally
 *
 *
 * Contract of data that is passed when forming a payment request as `base64` encoded string data when calling the LiqPay API
 */
export type CheckoutRequest = CheckoutInput & {
	/**
	 * API version. Current version: `7`
	 */
	version: LiqPayVersion

	/**
	 * Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 */
	publicKey: string

	/**
	 * Operation type. Possible values:
	 * - `pay` - payment
	 * - `hold` - blocking of funds on sender's account
	 * - `subscribe` - regular payment
	 * - `paydonate` - donation
	 */
	action: Action
}

/**
 * Raw layer - what is actually sent to LiqPay API
 * snake_case, bool/date/string transformations
 */
export const RawCheckoutRequestSchema = z
	.custom<CheckoutRequest>()
	.transform(req => {
		const { fiscalData, verifyCode, recurringByToken, detailAddenda, ...rest } =
			req
		const snakelized = objectToSnake(rest)
		const transformed = {
			...snakelized,
			rro_info: fiscalData,
			expired_date: dateToIso(snakelized.expired_date),
			paytypes: join(snakelized.paytypes),
			verifycode: boolTo(verifyCode, 'Y'),
			split_rules: stringify(snakelized.split_rules),
			subscribe: boolTo(snakelized.subscribe, '1'),
			subscribe_date_start: dateToIso(snakelized.subscribe_date_start),
			recurringbytoken: boolTo(recurringByToken, '1'),
			dae: stringify(detailAddenda),
		}
		return removeUndefined(transformed)
	})
export type RawCheckoutRequest = z.infer<typeof RawCheckoutRequestSchema>
