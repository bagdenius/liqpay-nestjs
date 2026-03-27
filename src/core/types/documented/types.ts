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

/**
 * Units of measurement of goods
 */
export enum LiqPayUnitEnum {
	meter = '10001',
	square_meter = '10002',
	cubic_meter = '10003',
	kilometer = '10004',
	square_kilometer = '10005',
	cubic_kilometer = '10006',
	decimeter = '10007',
	square_decimeter = '10008',
	cubic_decimeter = '10009',
	centimeter = '10010',
	square_centimeter = '10011',
	cubic_centimeter = '10012',
	hectare = '10013',
	liter = '10014',
	kilogram = '10015',
	gram = '10016',
	metric_ton = '10017',
	centner = '10018',
	kilowatt_hour = '10019',
	kilowatt = '10020',
	centner_per_hectare = '10021',
	head = '10022',
	notebook = '10023',
	book = '10024',
	copy = '10025',
	square_meter_residential = '10026',
	piece = '10027',
	box = '10028',
	cistern = '10029',
	crate = '10030',
	package = '10031',
	pack = '10032',
	roll = '10033',
	hryvnia = '10034',
	kilometer_per_hour = '10035',
	running_meter = '10036',
	product = '10037',
	set = '10038',
	day = '10039',
	service = '10040',
	hour = '10041',
	month = '10042',
	bottle = '10043',
	para = '10044',
	portion = '10045',
	minute = '10046',
	milliliter = '10047',
}

/**
 * Units of measurement of goods
 */
export type LiqPayUnit = `${LiqPayUnitEnum}`
