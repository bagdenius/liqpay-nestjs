import { FiscalData } from '../../types/common'

import { CommisionPayer } from './types'

export interface SplitRule {
	public_key: string
	amount: number
	commission_payer: CommisionPayer
	server_url: string
	rro_info?: FiscalData
}
