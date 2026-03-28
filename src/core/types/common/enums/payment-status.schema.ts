import { z } from 'zod'

export const LiqPayResolvedPaymentStatusSchema = z.enum([
	'error',
	'failure',
	'reversed',
	'subscribed',
	'success',
	'unsubscribed',
])
export type LiqPayResolvedPaymentStatus = z.infer<
	typeof LiqPayResolvedPaymentStatusSchema
>

export const LiqPayUnresolvedPaymentStatusSchema = z.enum([
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
export type LiqPayUnresolvedPaymentStatus = z.infer<
	typeof LiqPayUnresolvedPaymentStatusSchema
>

export const LiqPayOtherPaymentStatusSchema = z.enum([
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
export type LiqPayOtherPaymentStatus = z.infer<
	typeof LiqPayOtherPaymentStatusSchema
>

export const LiqPayPaymentStatusSchema = z.union([
	LiqPayResolvedPaymentStatusSchema,
	LiqPayUnresolvedPaymentStatusSchema,
	LiqPayOtherPaymentStatusSchema,
])
export type LiqPayPaymentStatus = z.infer<typeof LiqPayPaymentStatusSchema>
