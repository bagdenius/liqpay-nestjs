import z from 'zod'

export const toBoolean = (value: string | boolean) =>
	typeof value === 'string'
		? value.toLowerCase() === 'true' || value === '1' || value === 'Y'
		: Boolean(value)

export const boolTo = <T extends string>(
	value: boolean | undefined,
	trueValue: T,
): T | undefined => (value ? trueValue : undefined)

export const dateToIso = (d?: Date) => d?.toISOString()

export const parseBoolean = (value: string | boolean | undefined) =>
	value == null ? undefined : toBoolean(value)

export const parseDate = (value: Date | string | undefined) => {
	if (value === undefined) return undefined
	const date = new Date(value)
	return isNaN(date.getTime()) ? undefined : date
}

export const parseOptional = <T>(
	schema: z.ZodType<T>,
	value: unknown,
): T | undefined => {
	if (value == null) return undefined
	const result = schema.safeParse(value)
	return result.success ? result.data : undefined
}

export const stringify = <T>(v?: T) =>
	v === undefined ? undefined : JSON.stringify(v)

export const join = (arr?: string[]) =>
	arr?.length ? arr.join(',') : undefined
