import type { LiqPayMainParams, LiqPayProductParams } from '../../common'

import type {
	LiqPayAdvancedParams,
	LiqPayCheckoutParams,
	LiqPayRequestSenderParams,
} from './params'

export interface LiqPayBaseRequestData
	extends
		LiqPayMainParams,
		LiqPayCheckoutParams,
		LiqPayRequestSenderParams,
		LiqPayProductParams,
		LiqPayAdvancedParams {}
