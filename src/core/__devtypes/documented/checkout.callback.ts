import { Action, Currency, MpiEci, PaymentStatus, Paytype } from './types'

/**
 * Contract of decoded format of API parameters received in a request from LiqPay after payment
 */
export interface CheckoutCallback {
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
	completion_date: Date

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
	end_date: Date

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
	 * - card - payment by card
	 * - privat24 - through the Privat24 account
	 * - moment_part - installment
	 * - invoice - invoice to e-mail
	 * - qr - scan qr code
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
	 * Link to which the client must be redirected to complete 3DS verification
	 */
	redirect_to: string

	/**
	 * Date of last payment refund
	 */
	refund_date_last: Date

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
	 * Sender's card mask
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
	verifycode?: string
}
