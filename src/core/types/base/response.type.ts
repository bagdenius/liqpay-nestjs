import { CheckoutCallback, RawCheckoutCallback } from '../checkout'
import { LiqPayErrorResponse } from '../error'
import {
	PaymentStatusResponse,
	RawPaymentStatusResponse,
} from '../payment-status'

export type LiqPayResponse = CheckoutCallback | PaymentStatusResponse

export type LiqPayRawResponse =
	| RawCheckoutCallback
	| RawPaymentStatusResponse
	| LiqPayErrorResponse

export type Result<T> =
	| { data: T; error?: null }
	| { data: null; error: { code: string; description: string } }
