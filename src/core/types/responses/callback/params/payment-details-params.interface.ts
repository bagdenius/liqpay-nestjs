import type { LiqPayPaymentMethod } from '../../../common'

export interface LiqPayPaymentDetailsParams {
	/**
	 * __EN:__ Payment method. Possible values:
	 * - card - payment by card
	 * - privat24 - through the Privat24 account
	 * - moment_part - installment
	 * - invoice - invoice to e-mail
	 * - qr - scan qr code
	 *
	 * __UK:__ Спосіб оплати. Можливі значення:
	 * - card - оплата картою
	 * - privat24 - через кабінет Приват24
	 * - moment_part - розстрочка
	 * - invoice - рахунок на e-mail
	 * - qr - сканування qr-коду
	 */
	paytype: LiqPayPaymentMethod

	/**
	 * __EN:__ Date of debiting funds
	 *
	 * __UK:__ Дата списання коштів
	 */
	completion_date: string

	/**
	 * __EN:__ Sender IP address
	 *
	 * __UK:__ IP адреса відправника
	 */
	ip: string

	/**
	 * __EN:__ A unique user identifier on the merchant's website. Maximum length __100__ characters.
	 *
	 * __UK:__ Унікальний ідентифікатор користувача на сайті мерчанта. Максимальна довжина __100__ символів.
	 */
	customer: string
}
