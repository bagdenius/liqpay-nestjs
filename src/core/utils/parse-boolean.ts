export const toBoolean = (value: string | boolean) =>
	typeof value === 'string' ? value.toLowerCase() === 'true' : Boolean(value)

export const parseBool = (value: string | boolean | undefined) =>
	value !== undefined ? toBoolean(value) : undefined
