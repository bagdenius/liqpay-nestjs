import type { LiqPayBaseRequestData } from '.'

import type { LiqPaySubscriptionParams } from './params'

export interface LiqPaySubscribeRequestData
	extends LiqPayBaseRequestData, Required<LiqPaySubscriptionParams> {
	action: 'subscribe'
}
