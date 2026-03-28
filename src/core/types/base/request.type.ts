import { LiqPayCheckoutRequest, LiqPayRawCheckoutRequest } from '../checkout'
import {
	LiqPayPaymentStatusRequest,
	LiqPayRawPaymentStatusRequest,
} from '../payment-status'

export type LiqPayRequest = LiqPayCheckoutRequest | LiqPayPaymentStatusRequest

export type LiqPayRawRequest =
	| LiqPayRawCheckoutRequest
	| LiqPayRawPaymentStatusRequest
