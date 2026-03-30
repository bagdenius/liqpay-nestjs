const HOST_URL = 'https://www.liqpay.ua'
const BASE_URL = `${HOST_URL}/api`
export const REQUEST_URL = `${BASE_URL}/request`
export const CHECKOUT_URL = `${BASE_URL}/3/checkout`

export type LiqPayApiPath = typeof REQUEST_URL | typeof CHECKOUT_URL
