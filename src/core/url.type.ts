const LIQPAY_HOST_URL = 'https://www.liqpay.ua'
const LIQPAY_BASE_URL = `${LIQPAY_HOST_URL}/api`
export const LIQPAY_REQUEST_URL = `${LIQPAY_BASE_URL}/request`
export const LIQPAY_CHECKOUT_URL = `${LIQPAY_BASE_URL}/3/checkout`

export type LiqPayApiPath =
	| typeof LIQPAY_REQUEST_URL
	| typeof LIQPAY_CHECKOUT_URL
