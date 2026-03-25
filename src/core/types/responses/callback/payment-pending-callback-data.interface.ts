import type { LiqPayCallbackBaseParams, LiqPayTechnicalParams } from './params'

export interface LiqPayPendingCallbackData
	extends LiqPayCallbackBaseParams, LiqPayTechnicalParams {
	status: 'processing' | 'wait_secure'
}
