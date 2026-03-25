import type { LiqPayCurrency } from '..'

export interface LiqPayOrderParams {
	/**
	 * __EN:__ Payment amount. For example: `5`, `7.34`
	 *
	 * __UK:__ Сума платежу. Наприклад: `5`, `7.34`
	 */
	amount: number

	/**
	 * __EN:__ Payment currency. Possible values: `USD`, `EUR`, `UAH`
	 *
	 * __UK:__ Валюта платежу. Можливі значення: `USD`, `EUR`, `UAH`
	 */
	currency: LiqPayCurrency

	/**
	 * __EN:__ Payment purpose
	 *
	 * __UK:__ Призначення платежу
	 */
	description: string

	/**
	 * __EN:__ Unique purchase ID in your store. Maximum length __255__ characters
	 *
	 * __UK:__ Унікальний ID покупки у Вашому магазині. Максимальна довжина __255__ символів
	 */
	order_id: string
}
