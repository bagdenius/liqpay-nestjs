import { createHash } from 'crypto'

export function createSignature(privateKey: string, data: string) {
	const str = `${privateKey}${data}${privateKey}`
	return createHash('sha3-256').update(str).digest('base64')
}
