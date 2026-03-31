import { CheckoutRequest, RawCheckoutRequest } from '../checkout'
import {
	PaymentStatusRequest,
	RawPaymentStatusRequest,
} from '../payment-status'
import { RawRefundRequest, RefundRequest } from '../refund'

export type LiqPayRequest =
	| CheckoutRequest
	| PaymentStatusRequest
	| RefundRequest

export type LiqPayRawRequest =
	| RawCheckoutRequest
	| RawPaymentStatusRequest
	| RawRefundRequest
