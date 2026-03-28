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

export interface LiqPayCheckoutRequest {
	// SHARED
	version: 7
	public_key: string

	// PAYMENT CORE
	action: LiqPayAction
	amount: number
	currency: LiqPayCurrency
	description: string
	order_id: string

	// INVOICE LIFETIME
	expired_date?: string

	// CHECKOUT UI
	language?: LiqPayLanguage
	paytypes?: LiqPayPaytype[]

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
	subscribe_periodicity?: LiqPaySubscribePeriodicity

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
	rro_info?: LiqPayFiscalData

	// PAYMENT SPLITTING
	split_rules?: LiqPaySplitRule[]

	// METADATA
	info?: string

	// VERIFICATION
	verifycode?: 'Y'

	// SPECIAL (MCC 4511 / AIRLINE DATA)
	dae?: LiqPayDetailAddenda
}
