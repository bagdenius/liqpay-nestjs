export interface LiqPayCheckoutRequest {
	version: 7
	public_key: string
	action: LiqPayAction
	amount: number
	currency: LiqPayCurrency
	description: string
	order_id: string
	rro_info?: LiqPayFiscalData
	expired_date?: string
	language?: LiqPayLanguage
	paytypes?: LiqPayPaytype[]
	result_url?: string
	server_url?: string
	verifycode?: 'Y'
	split_rules?: LiqPaySplitRule[]
	sender_address?: string
	sender_city?: string
	sender_country_code?: string
	sender_first_name?: string
	sender_last_name?: string
	sender_postal_code?: string
	subscribe?: '1'
	subscribe_date_start?: string
	subscribe_periodicity?: LiqPaySubscribePeriodicity
	customer?: string
	recurringbytoken?: '1'
	customer_user_id?: string
	dae?: LiqPayDetailAddenda
	info?: string
	product_category?: string
	product_description?: string
	product_name?: string
	product_url?: string
}

export interface LiqPayCheckoutCallback {
	acq_id: number
	action: LiqPayAction
	agent_commission: number
	amount: number
	amount_bonus: number
	amount_credit: number
	amount_debit: number
	authcode_credit: string
	authcode_debit: string
	card_token: string
	commission_credit: number
	commission_debit: number
	completion_date: string
	create_date: string
	currency: LiqPayCurrency
	currency_credit: LiqPayCurrency
	currency_debit: LiqPayCurrency
	customer: string
	description: string
	end_date: string
	err_code: string
	err_description: string
	info: string
	ip: string
	is_3ds: boolean
	liqpay_order_id: string
	mpi_eci: LiqPayMpiEci
	order_id: string
	payment_id: number
	paytype: LiqPayPaytype
	public_key: string
	receiver_commission: number
	redirect_to: string
	refund_date_last: string
	rrn_credit: string
	rrn_debit: string
	sender_bonus: number
	sender_card_bank: string
	sender_card_country: string
	sender_card_mask2: string
	sender_iban: string
	sender_card_type: string
	sender_commission: number
	sender_first_name: string
	sender_last_name: string
	sender_phone: string
	status: LiqPayPaymentStatus
	wait_reserve_status?: 'true'
	token: string
	type: string
	version: 7
	err_erc: string
	product_category: string
	product_description: string
	product_name: string
	product_url: string
	refund_amount: number
	verifycode?: 'Y'
}

export interface LiqPayPaymentStatusRequest {
	version: 7
	public_key: string
	action: 'status'
	order_id: string
}

export interface LiqPayPaymentStatusResponse {
	acq_id: number
	action: LiqPayAction
	agent_commission: number
	amount: number
	amount_bonus: number
	amount_credit: number
	amount_debit: number
	authcode_credit: string
	authcode_debit: string
	bonus_procent: number
	bonus_type: LiqPayBonusType
	card_token: string
	commission_credit: number
	commission_debit: number
	confirm_phone: string
	create_date: string
	currency: LiqPayCurrency
	currency_credit: LiqPayCurrency
	currency_debit: LiqPayCurrency
	description: string
	end_date: string
	info: string
	ip: string
	is_3ds: boolean
	language: LiqPayLanguage
	liqpay_order_id: string
	moment_part: string
	mpi_eci: LiqPayMpiEci
	order_id: string
	payment_id: number
	paytype: LiqPayPaytype
	public_key: string
	receiver_commission: number
	result: LiqPayRequestResult
	rrn_credit: string
	rrn_debit: string
	sender_bonus: number
	sender_card_bank: string
	sender_card_country: string
	sender_card_mask2: string
	sender_iban: string
	sender_card_type: string
	sender_commission: number
	sender_first_name: string
	sender_last_name: string
	sender_phone: string
	status: LiqPayPaymentStatus
	wait_reserve_status?: 'true'
	transaction_id: number
	type: string
	version: 7
}

export interface LiqPayFiscalData {
	items?: LiqPayFiscalProductById[] | LiqPayFiscalProductByApi[]
	delivery_emails?: string[]
}

export interface LiqPayFiscalProductById {
	amount: number
	cost: number
	id: number
	price: number
}

export interface LiqPayFiscalProductByApi {
	amount: number
	cost: number
	price: number
	categoryname: string
	name: string
	unitcode: string
	barcode?: string
	codifier?: string
	vndcode?: string
	taxs?: LiqPayFiscalTax[]
}

export const LiqPayTaxRates = {
	NO_VAT: { letter: 'А', name: 'Без ПДВ 0%', type: 0, prc: 0 },
	VAT20: { letter: 'Б', name: 'ПДВ 20%', type: 0, prc: 20 },
	VAT7: { letter: 'В', name: 'ПДВ 7%', type: 0, prc: 7 },
	EXCISE5: { letter: 'Г', name: 'АКЦИЗ 5%', type: 1, prc: 5 },
} as const

export type LiqPayTaxRateKey = keyof typeof LiqPayTaxRates

export type LiqPayFiscalTax = (typeof LiqPayTaxRates)[LiqPayTaxRateKey]

export interface LiqPaySplitRule {
	public_key: string
	amount: number
	commission_payer: LiqPayCommisionPayer
	server_url: string
	rro_info?: LiqPayFiscalData
}

export interface LiqPayDetailAddenda {
	airLine: string
	ticketNumber: string
	passengerName: string
	flightNumber: string
	originCity: string
	destinationCity: string
	departureDate: string
}

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
export type LiqPayAction = `${LiqPayActionEnum}`

export enum LiqPayCurrencyEnum {
	USD = 'USD',
	EUR = 'EUR',
	UAH = 'UAH',
}
export type LiqPayCurrency = `${LiqPayCurrencyEnum}`

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
export type LiqPayPaytype = `${LiqPayPaytypeEnum}`

export type LiqPayMpiEci = 5 | 6 | 7

export enum LiqPayResolvedPaymentStatusEnum {
	ERROR = 'error',
	FAILURE = 'failure',
	REVERSED = 'reversed',
	SUBSCRIBED = 'subscribed',
	SUCCESS = 'success',
	UNSUBSCRIBED = 'unsubscribed',
}
export type LiqPayResolvedPaymentStatus = `${LiqPayResolvedPaymentStatusEnum}`

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
export type LiqPayUnresolvedPaymentStatus =
	`${LiqPayUnresolvedPaymentStatusEnum}`

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
export type LiqPayOtherPaymentStatus = `${LiqPayOtherPaymentStatusEnum}`

export type LiqPayPaymentStatus =
	| LiqPayResolvedPaymentStatus
	| LiqPayUnresolvedPaymentStatus
	| LiqPayOtherPaymentStatus

export enum LiqPayCommisionPayerEnum {
	SENDER = 'sender',
	RECEIVER = 'receiver',
}
export type LiqPayCommisionPayer = `${LiqPayCommisionPayerEnum}`

export enum LiqPayLanguageEnum {
	UK = 'uk',
	EN = 'en',
}
export type LiqPayLanguage = `${LiqPayLanguageEnum}`

export enum LiqPaySubscribePeriodicityEnum {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
	YEAR = 'year',
}
export type LiqPaySubscribePeriodicity = `${LiqPaySubscribePeriodicityEnum}`

export enum LiqPayBonusTypeEnum {
	BONUSPLUS = 'bonusplus',
	DISCOUNT_CLUB = 'discount_club',
	PERSONAL = 'personal',
	PROMO = 'promo',
}
export type LiqPayBonusType = `${LiqPayBonusTypeEnum}`

export enum LiqPayRequestResultEnum {
	OK = 'ok',
	ERROR = 'error',
}
export type LiqPayRequestResult = `${LiqPayRequestResultEnum}`
