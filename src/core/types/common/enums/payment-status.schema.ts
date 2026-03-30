import { z } from 'zod'

export const ResolvedPaymentStatusSchema = z.enum([
	'error',
	'failure',
	'reversed',
	'subscribed',
	'success',
	'unsubscribed',
])
export type ResolvedPaymentStatus = z.infer<typeof ResolvedPaymentStatusSchema>

export const UnresolvedPaymentStatusSchema = z.enum([
	'3ds_verify',
	'captcha_verify',
	'cvv_verify',
	'ivr_verify',
	'otp_verify',
	'password_verify',
	'phone_verify',
	'pin_verify',
	'receiver_verify',
	'sender_verify',
	'senderapp_verify',
	'wait_qr',
	'wait_sender',
	'p24_verify',
	'mp_verify',
])
export type UnresolvedPaymentStatus = z.infer<
	typeof UnresolvedPaymentStatusSchema
>

export const OtherPaymentStatusSchema = z.enum([
	'cash_wait',
	'hold_wait',
	'invoice_wait',
	'prepared',
	'processing',
	'wait_accept',
	'wait_card',
	'wait_compensation',
	'wait_lc',
	'wait_reserve',
	'wait_secure',
	'try_again',
])
export type OtherPaymentStatus = z.infer<typeof OtherPaymentStatusSchema>

export const PaymentStatusSchema = z.union([
	ResolvedPaymentStatusSchema,
	UnresolvedPaymentStatusSchema,
	OtherPaymentStatusSchema,
])
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>
