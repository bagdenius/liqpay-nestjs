import { Inject, Injectable } from '@nestjs/common'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayOptions } from './interfaces'

@Injectable()
export class LiqpayService {
	private readonly privateKey: string
	private readonly publicKey: string
	private readonly resultUrl: string
	private readonly serverUrl: string

	constructor(
		@Inject(LIQPAY_OPTIONS)
		private readonly options: LiqPayOptions,
	) {
		this.privateKey = options.privateKey
		this.publicKey = options.publicKey
		this.resultUrl = options.resultUrl ?? ''
		this.serverUrl = options.serverUrl ?? ''
	}
}
