export interface LiqPayRequestSenderParams {
	/**
	 * __EN:__ Sender address
	 *
	 * __UK:__ Адреса відправника
	 */
	sender_address?: string

	/**
	 * __EN:__ Sender city
	 *
	 * __UK:__ Місто відправника
	 */
	sender_city?: string

	/**
	 * __EN:__ Sender country code. Numeric __ISO 3166-1__ code
	 *
	 * __UK:__ Код країни відправника. Цифровий __ISO 3166-1__ код
	 */
	sender_country_code?: string

	/**
	 * __EN:__ Sender first name
	 *
	 * __UK:__ Ім'я відправника
	 */
	sender_first_name?: string

	/**
	 * __EN:__ Sender's last name
	 *
	 * __UK:__ Прізвище відправника
	 */
	sender_last_name?: string

	/**
	 * __EN:__ Sender's postal code
	 *
	 * __UK:__ Поштовий індекс відправника
	 */
	sender_postal_code?: string
}
