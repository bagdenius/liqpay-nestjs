export const parseDate = (value: Date | string | undefined) => {
	if (value === undefined) return undefined
	const date = new Date(value)
	return isNaN(date.getTime()) ? undefined : date
}
