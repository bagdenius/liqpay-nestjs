// TODO: add data for fiscalization with the transfer of goods

/**
 * Contract of data that is passed when forming a payment request as `base64` encoded string data when calling the LiqPay API
 */
export interface LiqPayCheckoutRequest {
	// MAIN PARAMS

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
	 * Data for fiscalization
	 */
	rro_info?: LiqPayFiscalData

	/**
	 * The time by which the customer can pay the invoice in `UTC`. Transmitted in the format `2016-04-24 00:00:00`
	 */
	expired_date?: string

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
	 * The URL in your store to which the buyer will be redirected after completing the purchase. Maximum length __510__ characters
	 */
	result_url?: string

	/**
	 * API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
	 */
	server_url?: string

	/**
	 * Possible value `Y`. Dynamic verification code, generated and returned in `Callback`. Similarly, the generated code will be passed in the verification transaction to be displayed in the client's card statement. Works for `action = auth`
	 */
	verifycode?: 'Y'

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

	// SENDER PARAMS

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

	// SUBSCRIPTION PARAMS

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

	// ONE CLICK PAYMENT PARAMS

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

	// OTHER PARAMS

	/**
	 * Long Detail Addenda entry. __Required for merchants with MCC 4511__.
	 *
	 * The `dae` parameter is a `JSON` string to which `base64` has been applied.
	 * It can contain the parameters given in the example below.
	 */
	dae?: LiqPayDetailAddenda

	/**
	 * Information to add data to the payment. For example: `"External information for payments"`
	 */
	info?: string

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
}

/**
 * Contract of decoded format of API parameters received in a request from LiqPay after payment
 */
export interface LiqPayCheckoutCallback {
	/**
	 * Acquirer ID
	 */
	acq_id: number

	/**
	 * Operation type. Possible values:
	 * - `pay` - payment
	 * - `hold` - blocking of funds on the sender's account
	 * - `subscribe` - creation of a regular payment
	 * - `regular` - regular payment
	 */
	action: LiqPayAction

	/**
	 * Agent commission in payment currency
	 */
	agent_commission: number

	/**
	 * Payment amount
	 */
	amount: number

	/**
	 * Sender bonus in debit payment currency
	 */
	amount_bonus: number

	/**
	 * Transaction amount credit in currency `currency_credit`
	 */
	amount_credit: number

	/**
	 * Transaction amount debit in currency `currency_debit`
	 */
	amount_debit: number

	/**
	 * Authorization code for credit transaction
	 */
	authcode_credit: string

	/**
	 * Authorization code for debit transaction
	 */
	authcode_debit: string

	/**
	 * Sender card token
	 */
	card_token: string

	/**
	 * Recipient fee in `currency_credit` currency
	 */
	commission_credit: number

	/**
	 * Sender fee in `currency_debit`
	 */
	commission_debit: number

	/**
	 * Date of debiting funds
	 */
	completion_date: string

	/**
	 * Payment creation date
	 */
	create_date: string

	/**
	 * Payment currency
	 */
	currency: LiqPayCurrency

	/**
	 * Transaction currency credit
	 */
	currency_credit: LiqPayCurrency

	/**
	 * Transaction currency debit
	 */
	currency_debit: LiqPayCurrency

	/**
	 * A unique user identifier on the merchant's website. Maximum length __100__ characters.
	 */
	customer: string

	/**
	 * Payment comment
	 */
	description: string

	/**
	 * Payment completion/change date
	 */
	end_date: string

	/**
	 * Error code
	 */
	err_code: string

	/**
	 * Error description
	 */
	err_description: string

	/**
	 * Additional payment information
	 */
	info: string

	/**
	 * Sender IP address
	 */
	ip: string

	/**
	 * Represents whether 3D-Secure verification was performed during payment. Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
	 */
	is_3ds: boolean

	/**
	 * `Order_id` of payment in the LiqPay system
	 */
	liqpay_order_id: string

	/**
	 * Code that represents whether 3D-Secure verification was performed during payment. Possible values:
	 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
	 * - `6` - the payer's card issuer does not support 3D-Secure technology
	 * - `7` - the transaction was completed without 3D-Secure
	 */
	mpi_eci: LiqPayMpiEci

	/**
	 * Payment `Order_id`
	 */
	order_id: string

	/**
	 * Payment ID in the LiqPay system
	 */
	payment_id: number

	/**
	 * Payment method. Possible values:
	 * - card - payment by card
	 * - privat24 - through the Privat24 account
	 * - moment_part - installment
	 * - invoice - invoice to e-mail
	 * - qr - scan qr code
	 */
	paytype: LiqPayPaytype

	/**
	 * Store public key
	 */
	public_key: string

	/**
	 * Recipient fee in payment currency
	 */
	receiver_commission: number

	/**
	 * Link to which the client must be redirected to complete 3DS verification
	 */
	redirect_to: string

	/**
	 * Date of last payment refund
	 */
	refund_date_last: string

	/**
	 * Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
	 */
	rrn_credit: string

	/**
	 * Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
	 */
	rrn_debit: string

	/**
	 * Sender bonus in payment currency
	 */
	sender_bonus: number

	/**
	 * Sender's bank
	 */
	sender_card_bank: string

	/**
	 * Country of the sender's card. Numeric __ISO 3166-1__ code
	 */
	sender_card_country: string

	/**
	 * Sender's card
	 */
	sender_card_mask2: string

	/**
	 * Sender's IBAN
	 */
	sender_iban: string

	/**
	 * Sender's card type MC/Visa
	 */
	sender_card_type: string

	/**
	 * Sender's fee in payment currency
	 */
	sender_commission: number

	/**
	 * Sender's first name
	 */
	sender_first_name: string

	/**
	 * Sender's last name
	 */
	sender_last_name: string

	/**
	 * Sender's phone number
	 */
	sender_phone: string

	/**
	 * Payment status
	 */
	status: LiqPayPaymentStatus

	/**
	 * An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
	 */
	wait_reserve_status?: 'true'

	/**
	 * Payment Token
	 */
	token: string

	/**
	 * Payment type
	 */
	type: string

	/**
	 * API version. Current value is `7`
	 */
	version: 7

	/**
	 * Error code
	 */
	err_erc: string

	/**
	 * Product category
	 */
	product_category: string

	/**
	 * Product description
	 */
	product_description: string

	/**
	 * Product name
	 */
	product_name: string

	/**
	 * Product page address
	 */
	product_url: string

	/**
	 * Refund amount
	 */
	refund_amount: number

	/**
	 * Verification code
	 */
	verifycode?: 'Y'
}

/**
 * Contract of data that is passed when forming a request to receive payment status as data in `base64` encoded string form when calling the LiqPay API
 */
export interface LiqPayPaymentStatusRequest {
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
	 * Operation type. Possible values: `status`
	 */
	action: 'status'

	/**
	 * Unique purchase ID in your store. Maximum length __255__ characters
	 */
	order_id: string
}

/**
 * Contract of data that comes in response to a request to get payment status
 */
export interface LiqPayPaymentStatusResponse {
	/**
	 * Acquirer ID
	 */
	acq_id: number

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
	action: LiqPayAction

	/**
	 * Agent commission in payment currency
	 */
	agent_commission: number

	/**
	 * Payment amount
	 */
	amount: number

	/**
	 * Sender bonus in debit payment currency
	 */
	amount_bonus: number

	/**
	 * Transaction amount credit in currency `currency_credit`
	 */
	amount_credit: number

	/**
	 * Amount of debit transaction in currency `currency_debit`
	 */
	amount_debit: number

	/**
	 * Authorization code for credit transaction
	 */
	authcode_credit: string

	/**
	 * Authorization code for debit transaction
	 */
	authcode_debit: string

	/**
	 * Discount amount in percentage
	 */
	bonus_procent: number

	/**
	 * Bonus type, possible values: `bonusplus`, `discount_club`, `personal`, `promo`
	 */
	bonus_type: LiqPayBonusType

	/**
	 * Sender card token
	 */
	card_token: string

	/**
	 * Recipient fee in `currency_credit` currency
	 */
	commission_credit: number

	/**
	 * Sender fee in `currency_debit`
	 */
	commission_debit: number

	/**
	 * Payer's phone. An OTP payment confirmation password was sent to this number and the payer's LiqPay account was linked. The phone number is indicated in the international format (Ukraine `+380`). For example: +380950000001 (with +) or 380950000001 (without +)
	 */
	confirm_phone: string

	/**
	 * Payment creation date
	 */
	create_date: string

	/**
	 * Payment currency
	 */
	currency: LiqPayCurrency

	/**
	 * Transaction currency credit
	 */
	currency_credit: LiqPayCurrency

	/**
	 * Transaction currency debit
	 */
	currency_debit: LiqPayCurrency

	/**
	 * Payment comment
	 */
	description: string

	/**
	 * Payment completion/change date
	 */
	end_date: string

	/**
	 * Additional payment information
	 */
	info: string

	/**
	 * Sender IP address
	 */
	ip: string

	/**
	 * Possible values: `true` - the transaction went through with 3DS verification, `false` - the transaction went through without 3DS verification
	 */
	is_3ds: boolean

	/**
	 * Client language: `uk`, `en`
	 */
	language: LiqPayLanguage

	/**
	 * `Order_id` of payment in the LiqPay system
	 */
	liqpay_order_id: string

	/**
	 * Payment in installments sign
	 */
	moment_part: string

	/**
	 * Represents whether 3D-Secure verification was performed during payment by code value. Possible values:
	 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
	 * - `6` - the payer's card issuer does not support 3D-Secure technology
	 * - `7` - the transaction was completed without 3D-Secure
	 */
	mpi_eci: LiqPayMpiEci

	/**
	 * Payment `Order_id`
	 */
	order_id: string

	/**
	 * Payment ID in the LiqPay system
	 */
	payment_id: number

	/**
	 * Payment method. Possible values:
	 * - `card` - payment by card
	 * - `privat24` - through the Privat24 account
	 * - `moment_part` - installment
	 * - `invoice` - invoice to e-mail
	 * - `qr` - scan qr code
	 */
	paytype: LiqPayPaytype

	/**
	 * Store public key
	 */
	public_key: string

	/**
	 * Recipient fee in payment currency
	 */
	receiver_commission: number

	/**
	 * Result of query execution: `ok`, `error`
	 */
	result: LiqPayRequestResult

	/**
	 * Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
	 */
	rrn_credit: string

	/**
	 * Unique transaction number in the authorization and settlement system of the servicing bank `Retrieval Reference number`
	 */
	rrn_debit: string

	/**
	 * Sender bonus in payment currency
	 */
	sender_bonus: number

	/**
	 * Sender's bank
	 */
	sender_card_bank: string

	/**
	 * Country of the sender's card. Numeric __ISO 3166-1__ code
	 */
	sender_card_country: string

	/**
	 * Sender's card
	 */
	sender_card_mask2: string

	/**
	 * Sender's IBAN
	 */
	sender_iban: string

	/**
	 * Sender's card type MC/Visa
	 */
	sender_card_type: string

	/**
	 * Sender's fee in payment currency
	 */
	sender_commission: number

	/**
	 * Sender's first name
	 */
	sender_first_name: string

	/**
	 * Sender's last name
	 */
	sender_last_name: string

	/**
	 * Sender's phone number
	 */
	sender_phone: string

	/**
	 * Payment status
	 */
	status: LiqPayPaymentStatus

	/**
	 * An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
	 */
	wait_reserve_status?: 'true'

	/**
	 * Transaction ID in the LiqPay system
	 */
	transaction_id: number

	/**
	 * Payment type
	 */
	type: string

	/**
	 * API version. Current value is `7`
	 */
	version: 7
}

/**
 * Fiscalization data provided by ID contract
 */
export interface LiqPayFiscalData {
	/**
	 * Data about the goods for which payment is made
	 */
	items?: LiqPayFiscalProductById[] | LiqPayFiscalProductByApi[]

	/**
	 * List of e-mails to which receipts should be sent after fiscalization
	 */
	delivery_emails?: string[]
}

/**
 * Contract of data about the product for which payment is being made provided by ID
 */
export interface LiqPayFiscalProductById {
	/**
	 * Quantity/volume
	 */
	amount: number

	/**
	 * The cost of all units of the specified product in the check (`quantity * unit_cost`)
	 */
	cost: number

	/**
	 * Product identifier. You can get it in your `Liqpay account - PPO - Cash register - Products`
	 */
	id: number

	/**
	 * Unit price of the product
	 */
	price: number
}

/**
 * Contract of data about the product for which payment is being made provided by API
 */
export interface LiqPayFiscalProductByApi {
	/**
	 * Quantity/volume
	 */
	amount: number

	/**
	 * The cost of all units of the specified product in the check (`quantity * unit_cost`)
	 */
	cost: number

	/**
	 * Unit price of the product
	 */
	price: number

	/**
	 * Category name
	 */
	categoryname: string

	/**
	 * Product name
	 */
	name: string

	/**
	 * Unit of measure code
	 */
	unitcode: string

	/**
	 * Digital value of the product barcode
	 */
	barcode?: string

	/**
	 * Code according to the UKTZED directory
	 */
	codifier?: string

	/**
	 * Internal product code
	 */
	vndcode?: string

	/**
	 * Tax rate for the product
	 */
	taxs?: LiqPayFiscalTax[]
}

/**
 * Constant values ​​of tax rates for goods
 */
export const LiqPayTaxRates = {
	NO_VAT: { letter: 'А', name: 'Без ПДВ 0%', type: 0, prc: 0 },
	VAT20: { letter: 'Б', name: 'ПДВ 20%', type: 0, prc: 20 },
	VAT7: { letter: 'В', name: 'ПДВ 7%', type: 0, prc: 7 },
	EXCISE5: { letter: 'Г', name: 'АКЦИЗ 5%', type: 1, prc: 5 },
} as const

/**
 * Keys of available tax rates in LiqPay.
 *
 * Can be used to reference a specific tax rate from `LiqPayTaxRates`.
 *
 * Example:
 * ```ts
 * const key: LiqPayTaxRateKey = 'VAT20';
 * const tax = LiqPayTaxRates[key];
 * ```
 */
export type LiqPayTaxRateKey = keyof typeof LiqPayTaxRates

/**
 * Fiscal tax object representing a single tax rate from LiqPay.
 *
 * Corresponds to one of the entries in `LiqPayTaxRates`:
 * - `letter`: tax letter code ('А', 'Б', 'В', 'Г')
 * - `name`: human-readable tax name
 * - `type`: numeric tax type (0 or 1)
 * - `prc`: percentage of tax
 *
 * Example:
 * ```ts
 * const tax: LiqPayFiscalTax = LiqPayTaxRates.VAT20;
 * ```
 */
export type LiqPayFiscalTax = (typeof LiqPayTaxRates)[LiqPayTaxRateKey]

/**
 * Payment splitting options contract
 */
export interface LiqPaySplitRule {
	/**
	 * Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 */
	public_key: string

	/**
	 * Total payment amount. For example: `5`, `7.34`
	 */
	amount: number

	/**
	 * Payer of the acquiring fee. Possible values: `sender`, `receiver`
	 */
	commission_payer: LiqPayCommisionPayer

	/**
	 * API URL in your store for notifications about payment status changes (`server -> server`). Maximum length __510__ characters.
	 */
	server_url: string

	/**
	 * Data on fiscalization of payments for each recipient
	 */
	rro_info?: LiqPayFiscalData
}

/**
 * Contract of data of Long Detail Addenda entry. __Required for merchants with MCC 4511__.
 */
export interface LiqPayDetailAddenda {
	/**
	 * Airline abbreviation, max 4 characters
	 */
	airLine: string

	/**
	 * Reservation number (locator), max 15 characters
	 */
	ticketNumber: string

	/**
	 * Passenger name, max 29 characters
	 */
	passengerName: string

	/**
	 * Flight number, max 5 digits
	 */
	flightNumber: string

	/**
	 * Departure city/airport code, max 5 characters
	 */
	originCity: string

	/**
	 * Destination city/airport code, max 5 characters
	 */
	destinationCity: string

	/**
	 * Departure date in YYMMDD format, max 6 digits
	 */
	departureDate: string
}

/**
 * Transaction type
 */
export enum LiqPayActionEnum {
	PAY = 'pay',
	HOLD = 'hold',
	PAYSPLIT = 'paysplit',
	SUBSCRIBE = 'subscribe',
	PAYDONATE = 'paydonate',
	AUTH = 'auth',
	REGULAR = 'regular',
	STATUS = 'status',
}

/**
 * Transaction type
 */
export type LiqPayAction = `${LiqPayActionEnum}`

/**
 * Payment currency
 */
export enum LiqPayCurrencyEnum {
	USD = 'USD',
	EUR = 'EUR',
	UAH = 'UAH',
}

/**
 * Payment currency
 */
export type LiqPayCurrency = `${LiqPayCurrencyEnum}`

/**
 * Payment methods to be displayed at checkout
 */
export enum LiqPayPaytypeEnum {
	APAY = 'apay',
	GPAY = 'gpay',
	CARD = 'card',
	PRIVAT24 = 'privat24',
	MASTERPASS = 'masterpass',
	MOMENT_PART = 'moment_part',
	PAYPART = 'paypart',
	CASH = 'cash',
	INVOICE = 'invoice',
	QR = 'qr',
}

/**
 * Payment methods to be displayed at checkout
 */
export type LiqPayPaytype = `${LiqPayPaytypeEnum}`

/**
 * Code that represents whether 3D-Secure verification was performed during payment
 */
export type LiqPayMpiEci = 5 | 6 | 7

/**
 * Resolved payment statuses
 */
export enum LiqPayResolvedPaymentStatusEnum {
	ERROR = 'error',
	FAILURE = 'failure',
	REVERSED = 'reversed',
	SUBSCRIBED = 'subscribed',
	SUCCESS = 'success',
	UNSUBSCRIBED = 'unsubscribed',
}

/**
 * Resolved payment statuses
 */
export type LiqPayResolvedPaymentStatus = `${LiqPayResolvedPaymentStatusEnum}`

/**
 * Statuses that require payment confirmation
 */
export enum LiqPayUnresolvedPaymentStatusEnum {
	DS3_VERIFY = '3ds_verify',
	CAPTCHA_VERIFY = 'captcha_verify',
	CVV_VERIFY = 'cvv_verify',
	IVR_VERIFY = 'ivr_verify',
	OTP_VERIFY = 'otp_verify',
	PASSWORD_VERIFY = 'password_verify',
	PHONE_VERIFY = 'phone_verify',
	PIN_VERIFY = 'pin_verify',
	RECEIVER_VERIFY = 'receiver_verify',
	SENDER_VERIFY = 'sender_verify',
	SENDERAPP_VERIFY = 'senderapp_verify',
	WAIT_QR = 'wait_qr',
	WAIT_SENDER = 'wait_sender',
	P24_VERIFY = 'p24_verify',
	MP_VERIFY = 'mp_verify',
}

/**
 * Statuses that require payment confirmation
 */
export type LiqPayUnresolvedPaymentStatus =
	`${LiqPayUnresolvedPaymentStatusEnum}`

/**
 * Other payment statuses
 */
export enum LiqPayOtherPaymentStatusEnum {
	CASH_WAIT = 'cash_wait',
	HOLD_WAIT = 'hold_wait',
	INVOICE_WAIT = 'invoice_wait',
	PREPARED = 'prepared',
	PROCESSING = 'processing',
	WAIT_ACCEPT = 'wait_accept',
	WAIT_CARD = 'wait_card',
	WAIT_COMPENSATION = 'wait_compensation',
	WAIT_LC = 'wait_lc',
	WAIT_RESERVE = 'wait_reserve',
	WAIT_SECURE = 'wait_secure',
	TRY_AGAIN = 'try_again',
}

/**
 * Other payment statuses
 */
export type LiqPayOtherPaymentStatus = `${LiqPayOtherPaymentStatusEnum}`

/**
 * Payment status
 */
export type LiqPayPaymentStatus =
	| LiqPayResolvedPaymentStatus
	| LiqPayUnresolvedPaymentStatus
	| LiqPayOtherPaymentStatus

/**
 * Payer of the acquiring fee
 */
export enum LiqPayCommisionPayerEnum {
	SENDER = 'sender',
	RECEIVER = 'receiver',
}

/**
 * Payer of the acquiring fee
 */
export type LiqPayCommisionPayer = `${LiqPayCommisionPayerEnum}`

/**
 * Client language
 */
export enum LiqPayLanguageEnum {
	UK = 'uk',
	EN = 'en',
}

/**
 * Client language
 */
export type LiqPayLanguage = `${LiqPayLanguageEnum}`

/**
 * The frequency of funds write-off
 */
export enum LiqPaySubscribePeriodicityEnum {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}

/**
 * The frequency of funds write-off
 */
export type LiqPaySubscribePeriodicity = `${LiqPaySubscribePeriodicityEnum}`

/**
 * Bonus type
 */
export enum LiqPayBonusTypeEnum {
	BONUSPLUS = 'bonusplus',
	DISCOUNT_CLUB = 'discount_club',
	PERSONAL = 'personal',
	PROMO = 'promo',
}

/**
 * Bonus type
 */
export type LiqPayBonusType = `${LiqPayBonusTypeEnum}`

/**
 * Result of request execution
 */
export enum LiqPayRequestResultEnum {
	OK = 'ok',
	ERROR = 'error',
}

/**
 * Result of request execution
 */
export type LiqPayRequestResult = `${LiqPayRequestResultEnum}`
