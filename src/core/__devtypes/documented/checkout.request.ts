import { LiqPayDetailAddenda } from './detail-addenda'
import { LiqPayFiscalData } from './fiscal-data'
import { LiqPaySplitRule } from './split-rule'
import {
	LiqPayAction,
	LiqPayCurrency,
	LiqPayLanguage,
	LiqPayPaytype,
	LiqPaySubscribePeriodicity,
} from './types'

/**
 * Contract of data that is passed when forming a payment request as `base64` encoded string data when calling the LiqPay API
 */
export interface LiqPayCheckoutRequest {
	/**
	 * @group shared
	 */

	/**
	 * API version. Current version: `7`
	 */
	version: 7

	/**
	 * Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 */
	public_key: string

	/**
	 * @group payment core
	 */

	/**
	 * Operation type. Possible values:
	 * - `pay` - payment
	 * - `hold` - blocking of funds on sender's account
	 * - `subscribe` - regular payment
	 * - `paydonate` - donation
	 */
	action: LiqPayAction

	/**
	 * Payment amount. For example: `5`, `7.34`
	 */
	amount: number

	/**
	 * Payment currency. Possible values: `USD`, `EUR`, `UAH`
	 */
	currency: LiqPayCurrency

	/**
	 * Payment purpose
	 */
	description: string

	/**
	 * Unique purchase ID in your store. Maximum length __255__ characters
	 */
	order_id: string

	/**
	 * @group invoice lifetime
	 */

	/**
	 * The time by which the customer can pay the invoice in `UTC`. Transmitted in the format `2016-04-24 00:00:00`
	 */
	expired_date?: string

	/**
	 * @group checkout UI
	 */

	/**
	 * Client language: `uk`, `en`
	 */
	language?: LiqPayLanguage

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
	paytypes?: LiqPayPaytype[]

	/**
	 * @group checkout flow
	 */

	/**
	 * The URL in your store to which the buyer will be redirected after completing the purchase. Maximum length __510__ characters
	 */
	result_url?: string

	/**
	 * API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
	 */
	server_url?: string

	/**
	 * @group fiscalization
	 */

	/**
	 * Data for fiscalization
	 */
	rro_info?: LiqPayFiscalData

	/**
	 * @group sender
	 */

	/**
	 * Sender address
	 */
	sender_address?: string

	/**
	 * Sender city
	 */
	sender_city?: string

	/**
	 * Sender country code. Numeric __ISO 3166-1__ code
	 */
	sender_country_code?: string

	/**
	 * Sender first name
	 */
	sender_first_name?: string

	/**
	 * Sender's last name
	 */
	sender_last_name?: string

	/**
	 * Sender's postal code
	 */
	sender_postal_code?: string

	/**
	 * @group subscription
	 */

	/**
	 * Regular payment. Possible values: `1`
	 */
	subscribe?: '1'

	/**
	 * Date of first payment. The time must be specified in the format `2015-03-31 00:00:00` in `UTC`. If the date is past, the subscription will be activated from the current date of receipt of the request
	 */
	subscribe_date_start?: string

	/**
	 * The frequency of funds write-off. Possible values:
	 * - `day` - daily
	 * - `week` - weekly
	 * - `month` - once a month
	 * - `year` - once a year, раз
	 */
	subscribe_periodicity?: LiqPaySubscribePeriodicity

	/**
	 * Payment with splitting the amount into several recipients. This parameter specifies a `JSON` array with payment splitting rules.
	 * One debit is made from the client and several credits are made to the recipients. If you need to transfer your purpose for each amount, use the `description` parameter.
	 * If you need to fiscalize payments for each recipient, add the `rro_info` object. The acquiring fee is charged for each recipient.
	 * @example
	 * ```json
	 * [
	 *   {
	 *     "public_key": "i000000001",
	 *     "amount": 404,
	 *     "commission_payer": "sender",
	 *     "server_url": "https://server1/callback",
	 *     "rro_info": {
	 *       "items": [
	 *         {
	 *           "amount": 2, // quantity
	 *           "price": 202, // unit price
	 *           "cost": 404, // total cost
	 *           "id": 123456 // product id
	 *         }
	 *       ],
	 *       "delivery_emails": [
	 *         "email1@email.com",
	 *         "email2@email.com"
	 *       ]
	 *     }
	 *   },
	 *   {
	 *     "public_key": "i000000002",
	 *     "amount": 200,
	 *     "commission_payer": "receiver",
	 *     "server_url": "https://server2/callback"
	 *   }
	 * ]
	 * ```
	 */
	split_rules?: LiqPaySplitRule[]

	/**
	 * @group one-click payment / tokenization
	 */

	/**
	 * Unique client identifier on the merchant's website. When transmitting the parameter, LiqPay remembers the client's payment details and his identifier - further payment can be made in 1 click. Maximum length __100__ characters. (When using the parameter for __Masterpass 1 click__, a valid payer's phone number is transmitted in this field)
	 */
	customer?: string

	/**
	 * Allows you to generate a `card_token` of the payer, which you will receive in a callback request to `server_url`. `card_token` allows you to make payments without entering the payer's card details, using the token payment API - that is, in 1 click. To receive `card_token`, you must pass the value: `1` in the request
	 */
	recurringbytoken?: '1'

	/**
	 * User ID in the merchant system, transmitted with each user payment (must not match `customer`, used for payment using the __Masterpass 1 click__ wallet)
	 */
	customer_user_id?: string

	/**
	 * @group product
	 */

	/**
	 * Product category. Maximum length `25` characters
	 */
	product_category?: string

	/**
	 * Product description. Maximum length `500` characters.
	 */
	product_description?: string

	/**
	 * Product name. Maximum length `100` characters.
	 */
	product_name?: string

	/**
	 * Product page address. Maximum length `510` characters
	 */
	product_url?: string

	/**
	 * @group metadata
	 */

	/**
	 * Information to add data to the payment. For example: `"External information for payments"`
	 */
	info?: string

	/**
	 * @group verification
	 */

	/**
	 * Possible value `Y`. Dynamic verification code, generated and returned in `Callback`. Similarly, the generated code will be passed in the verification transaction to be displayed in the client's card statement. Works for `action = auth`
	 */
	verifycode?: 'Y'

	/**
	 * @group special (mcc 4511 / airline data)
	 */

	/**
	 * Long Detail Addenda entry. __Required for merchants with MCC 4511__.
	 *
	 * The `dae` parameter is a `JSON` string to which `base64` has been applied.
	 * It can contain the parameters given in the example below.
	 */
	dae?: LiqPayDetailAddenda
}
