import { type DynamicModule, Global, Module } from '@nestjs/common'

import { LIQPAY_OPTIONS } from './constants'
import type { LiqPayAsyncOptions, LiqPayOptions } from './interfaces'
import {
	createLiqpayAsyncOptionsProvider,
	createLiqpayOptionsProvider,
} from './liqpay.providers'
import { LiqpayService } from './liqpay.service'

@Module({})
export class LiqPayModule {
	public static forRoot(options: LiqPayOptions): DynamicModule {
		return {
			module: LiqPayModule,
			providers: [createLiqpayOptionsProvider(options), LiqpayService],
			exports: [LiqpayService, LIQPAY_OPTIONS],
			global: options.isGlobal ?? false,
		}
	}

	public static forRootAsync(options: LiqPayAsyncOptions): DynamicModule {
		return {
			module: LiqPayModule,
			imports: options.imports ?? [],
			providers: [createLiqpayAsyncOptionsProvider(options), LiqpayService],
			exports: [LiqpayService, LIQPAY_OPTIONS],
			global: options.isGlobal ?? false,
		}
	}
}
