import { LiqPayErrorCode } from '../common/enums'

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
