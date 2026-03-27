export function decodeData<T = any>(encoded: string): T {
	return JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'))
}
