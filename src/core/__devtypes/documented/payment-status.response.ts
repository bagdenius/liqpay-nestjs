import {
	Action,
	BonusType,
	Currency,
	Language,
	MpiEci,
	PaymentStatus,
	Paytype,
	RequestResult,
} from './types'

/**
 * Contract of data that comes in response to a request to get payment status
 */
export interface PaymentStatusResponse {
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
	action: Action

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
	bonus_type: BonusType

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
	create_date: Date

	/**
	 * Payment currency
	 */
	currency: Currency

	/**
	 * Transaction currency credit
	 */
	currency_credit: Currency

	/**
	 * Transaction currency debit
	 */
	currency_debit: Currency

	/**
	 * Payment comment
	 */
	description: string

	/**
	 * Payment completion/change date
	 */
	end_date: Date

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
	language: Language

	/**
	 * `Order_id` of payment in the LiqPay system
	 */
	liqpay_order_id: string

	/**
	 * Payment in installments sign
	 */
	moment_part: boolean

	/**
	 * Represents whether 3D-Secure verification was performed during payment by code value. Possible values:
	 * - `5` - the transaction was completed with 3DS (the issuer and acquirer support 3D-Secure technology)
	 * - `6` - the payer's card issuer does not support 3D-Secure technology
	 * - `7` - the transaction was completed without 3D-Secure
	 */
	mpi_eci: MpiEci

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
	paytype: Paytype

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
	result: RequestResult

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
	status: PaymentStatus

	/**
	 * An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
	 */
	wait_reserve_status?: boolean

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
