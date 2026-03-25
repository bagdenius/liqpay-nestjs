import type {
	LiqPayCallbackBaseParams,
	LiqPayErrorParams,
	LiqPayTechnicalParams,
} from './params'

export interface LiqPayErrorCallbackData
	extends LiqPayCallbackBaseParams, LiqPayTechnicalParams, LiqPayErrorParams {
	status: 'failure' | 'error'
}
