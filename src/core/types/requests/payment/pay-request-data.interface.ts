import type { LiqPayBaseRequestData } from '.'

export interface LiqPayPayRequestData extends LiqPayBaseRequestData {
	action: 'pay' | 'hold' | 'paydonate'
}
