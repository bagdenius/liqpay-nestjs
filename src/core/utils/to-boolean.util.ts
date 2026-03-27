export const toBoolean = (v: string | boolean) =>
	typeof v === 'string' ? v.toLowerCase() === 'true' : Boolean(v)
