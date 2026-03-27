import {
	LiqPayAction,
	LiqPayBonusType,
	LiqPayCurrency,
	LiqPayLanguage,
	LiqPayMpiEci,
	LiqPayPaymentStatus,
	LiqPayPaytype,
	LiqPayRequestResult,
} from './types'

export interface LiqPayPaymentStatusResponse {
	version: 7
	public_key: string
	action: LiqPayAction
	acq_id: number
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
	moment_part: boolean
	mpi_eci: LiqPayMpiEci
	order_id: string
	payment_id: number
	paytype: LiqPayPaytype
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
	wait_reserve_status?: boolean
	transaction_id: number
	type: string
}
