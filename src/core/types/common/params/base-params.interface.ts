export interface LiqPayBaseParams {
	/**
	 * __EN:__ API version. Current version: `7`
	 *
	 * __UK:__ Версія API. Поточне значення: `7`
	 */
	version: number

	/**
	 * __EN:__ Public API key: ID of created company. Example: `i00000000`
	 *
	 * You can get the key in the store settings.
	 *
	 * __UK:__ Публічний ключ - ідентифікатор створеної компанії. Наприклад: `i00000000`
	 *
	 * Отримати ключ можна в налаштуваннях магазину
	 */
	public_key: string
}
