import { CheckoutRequest, RawCheckoutRequest } from '../checkout'
import {
	PaymentStatusRequest,
	RawPaymentStatusRequest,
} from '../payment-status'

export type LiqPayRequest = CheckoutRequest | PaymentStatusRequest
export type LiqPayRawRequest = RawCheckoutRequest | RawPaymentStatusRequest
