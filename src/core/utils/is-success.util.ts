import { LiqPayCallResult } from '../types/base'

export function isSuccess<T>(
	res: LiqPayCallResult<T>,
): res is { data: T; error: null } {
	return res.error === null
}
