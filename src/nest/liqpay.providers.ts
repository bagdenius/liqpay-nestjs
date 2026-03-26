import type { Provider } from '@nestjs/common'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayAsyncOptions, LiqPayOptions } from './interfaces'

export function createLiqpayOptionsProvider(options: LiqPayOptions): Provider {
	return {
		provide: LIQPAY_OPTIONS,
		useValue: Object.freeze<LiqPayOptions>({ ...options }),
	}
}

export function createLiqpayAsyncOptionsProvider(
	options: LiqPayAsyncOptions,
): Provider {
	return {
		provide: LIQPAY_OPTIONS,
		useFactory: async (
			...args: Parameters<LiqPayAsyncOptions['useFactory']>
		) => {
			const resolved = await options.useFactory(...args)
			if (!resolved) {
				throw new Error('[LiqpayModule] Options are required')
			}
			const { privateKey, publicKey, resultUrl, serverUrl } = resolved
			if (typeof privateKey !== 'string' || typeof publicKey !== 'string') {
				throw new Error(
					'[LiqpayModule] "publicKey" and "privateKey" are required and must be strings',
				)
			}
			if (
				(resultUrl && typeof resultUrl !== 'string') ||
				(serverUrl && typeof serverUrl !== 'string')
			) {
				throw new Error(
					'[LiqpayModule] "resultUrl" and "serverUrl" must be strings',
				)
			}
			return Object.freeze({ ...resolved })
		},
		inject: options.inject ?? [],
	}
}
