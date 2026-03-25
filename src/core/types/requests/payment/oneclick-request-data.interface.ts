import type { LiqPayPayRequestData } from '.'

import type { LiqPayOneClickParams } from './params'

export interface LiqPayOneClickRequestData
	extends LiqPayPayRequestData, Required<LiqPayOneClickParams> {
	action: 'pay'
}
