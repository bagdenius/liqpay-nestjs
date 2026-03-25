import type {
	LiqPayOneClickRequestData,
	LiqPayPayRequestData,
	LiqPaySubscribeRequestData,
} from '.'

/**
 * __EN:__ API parameter data that is passed when forming a payment request as `base64` encoded string data when calling the LiqPay API
 *
 * __UK:__ Дані параметрів API, які передаються при формуванні запиту на оплату як data у закодованому `base64` строковому вигляді при виклику API LiqPay
 */
export type LiqPayPaymentRequestData =
	| LiqPayPayRequestData
	| LiqPaySubscribeRequestData
	| LiqPayOneClickRequestData
