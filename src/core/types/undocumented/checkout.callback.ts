import {
	LiqPayAction,
	LiqPayCurrency,
	LiqPayMpiEci,
	LiqPayPaymentStatus,
	LiqPayPaytype,
} from './types'

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
	completion_date: Date
	create_date: Date
	currency: LiqPayCurrency
	currency_credit: LiqPayCurrency
	currency_debit: LiqPayCurrency
	customer: string
	description: string
	end_date: Date
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
	refund_date_last: Date
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
	wait_reserve_status?: boolean
	token: string
	type: string
	version: 7
	err_erc: string
	product_category: string
	product_description: string
	product_name: string
	product_url: string
	refund_amount: number
	verifycode?: string
}
