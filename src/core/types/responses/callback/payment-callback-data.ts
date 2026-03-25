import type {
	LiqPayErrorCallbackData,
	LiqPayPendingCallbackData,
	LiqPaySuccessCallbackData,
} from '.'

/**
 * __EN:__ Decoded format of API parameters received in a request from LiqPay after payment
 *
 * __UK:__ Розшифрований формат параметрів API, що приходять в запиті від LiqPay після оплати
 */
export type LiqPayCallbackData =
	| LiqPaySuccessCallbackData
	| LiqPayErrorCallbackData
	| LiqPayPendingCallbackData
