import { LiqPayErrorCode } from './error-code.schema'

export type InternalErrorCode =
	| LiqPayErrorCode
	| 'decode_error'
	| 'validation_error'
	| 'invalid_response'
	| 'http_error'

export type LiqPayError = {
	code: LiqPayErrorCode | InternalErrorCode
	description: string
}
