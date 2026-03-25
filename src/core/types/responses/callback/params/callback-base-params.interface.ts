import type { LiqPayMainParams, LiqPayPaymentStatus } from '../../../common'

export interface LiqPayCallbackBaseParams extends LiqPayMainParams {
	/**
	 * __EN:__ Payment status
	 *
	 * __UK:__ Статус платежу
	 */
	status: LiqPayPaymentStatus

	/**
	 * __EN:__ `Order_id` of payment in the LiqPay system
	 *
	 * __UK:__ `Order_id` платежу в системі LiqPay
	 */
	liqpay_order_id: string

	/**
	 * __EN:__ Payment ID in the LiqPay system
	 *
	 * __UK:__ Id платежу в системі LiqPay
	 */
	payment_id: number

	/**
	 * __EN:__ Payment creation date
	 *
	 * __UK:__ Дата створення платежу
	 */
	create_date: string

	/**
	 * __EN:__ Payment completion/change date
	 *
	 * __UK:__ Дата завершення/зміни платежу
	 */
	end_date: string
}
