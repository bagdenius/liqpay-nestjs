import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

import type { LiqPayOptions } from './liqpay-options.interface'

export interface LiqPayAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => LiqPayOptions | Promise<LiqPayOptions>
	inject?: FactoryProvider['inject']
	isGlobal?: boolean
}
