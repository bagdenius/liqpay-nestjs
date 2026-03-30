import { DetailAddenda } from './detail-addenda'
import { FiscalData } from './fiscal-data'
import { SplitRule } from './split-rule'
import {
	Action,
	Currency,
	Language,
	Paytype,
	SubscribePeriodicity,
} from './types'

export interface CheckoutRequest {
	// SHARED
	version: 7
	public_key: string

	// PAYMENT CORE
	action: Action
	amount: number
	currency: Currency
	description: string
	order_id: string

	// INVOICE LIFETIME
	expired_date?: string

	// CHECKOUT UI
	language?: Language
	paytypes?: Paytype[]

	// CHECKOUT FLOW
	result_url?: string
	server_url?: string

	// SENDER
	sender_country_code?: string
	sender_first_name?: string
	sender_last_name?: string
	sender_postal_code?: string
	sender_address?: string
	sender_city?: string

	// SUBSCRIPTION
	subscribe?: '1'
	subscribe_date_start?: string
	subscribe_periodicity?: SubscribePeriodicity

	// ONE CLICK PAYMENT / TOKENIZATION
	customer?: string
	recurringbytoken?: '1'
	customer_user_id?: string

	// PRODUCT
	product_category?: string
	product_description?: string
	product_name?: string
	product_url?: string

	// FISCALIZATION
	rro_info?: FiscalData

	// PAYMENT SPLITTING
	split_rules?: SplitRule[]

	// METADATA
	info?: string

	// VERIFICATION
	verifycode?: 'Y'

	// SPECIAL (MCC 4511 / AIRLINE DATA)
	dae?: DetailAddenda
}
