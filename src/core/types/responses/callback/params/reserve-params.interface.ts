export interface LiqPayReserveParams {
	/**
	 * __EN:__ An additional payment status indicating that the current payment is reserved for a refund on your store. Possible values: `true` - the payment is reserved for a refund
	 *
	 * __UK:__ Додатковий статус платежу, який говорить про те, що поточний платіж зарезервовано для виконання повернення по вашому магазину. Можливі значення: `true` - платіж зарезервовано для виконання повернення
	 */
	wait_reserve_status: string
}
