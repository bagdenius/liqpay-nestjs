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

export interface PaymentStatusResponse {
	version: 7
	public_key: string
	action: Action
	acq_id: number
	agent_commission: number
	amount: number
	amount_bonus: number
	amount_credit: number
	amount_debit: number
	authcode_credit: string
	authcode_debit: string
	bonus_procent: number
	bonus_type: BonusType
	card_token: string
	commission_credit: number
	commission_debit: number
	confirm_phone: string
	create_date: string
	currency: Currency
	currency_credit: Currency
	currency_debit: Currency
	description: string
	end_date: string
	info: string
	ip: string
	is_3ds: boolean
	language: Language
	_order_id: string
	moment_part: boolean
	mpi_eci: MpiEci
	order_id: string
	payment_id: number
	paytype: Paytype
	receiver_commission: number
	result: RequestResult
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
	status: PaymentStatus
	wait_reserve_status?: boolean
	transaction_id: number
	type: string
}
