import { Result } from '../types/base'

export function isSuccess<T>(res: Result<T>): res is { data: T; error: null } {
	return res.error === null
}
