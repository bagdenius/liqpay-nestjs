export function encodeData(data: object) {
	return Buffer.from(JSON.stringify(data)).toString('base64')
}
