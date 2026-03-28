import { LiqPayCheckoutCallback, LiqPayRawCheckoutCallback } from '../checkout'
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
