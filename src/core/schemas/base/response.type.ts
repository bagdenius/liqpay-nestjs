import { LiqPayCheckoutCallback, LiqPayRawCheckoutCallback } from '../checkout'
import { LiqPayErrorResponse } from '../error'
import {
	LiqPayPaymentStatusResponse,
	LiqPayRawPaymentStatusResponse,
} from '../payment-status'

export type LiqPayResponse =
	| LiqPayCheckoutCallback
	| LiqPayPaymentStatusResponse

export type LiqPayRawResponse =
	| LiqPayRawCheckoutCallback
	| LiqPayRawPaymentStatusResponse
	| LiqPayErrorResponse

export type LiqPayCallResult<T> =
	| { data: T; error?: null }
	| { data: null; error: { code: string; description: string } }
