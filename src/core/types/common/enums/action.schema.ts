import z from 'zod'

export const ActionSchema = z.enum([
	// checkout
	// payments.pay()
	'pay',
	// payments.hold()
	'hold',
	// payments.subscribe()
	'subscribe',
	// payments.donate()
	'paydonate',

	// for creating dynamic verification code - did not found where it used
	// payments.auth()
	'auth',

	// refunds.refund()
	'refund',

	// payments.payBycard()
	'pay',

	// payments.payByPrivatPay()
	'payment_prepare',

	// payments.payByApplePay()
	'pay',
	// payments.holdByApplePay()
	'hold',

	// payments.payByGooglePay()
	'pay',
	// payments.holdByGooglePay()
	'hold',

	// subscription
	// subscriptions.subscribe()
	'subscribe',
	// subscriptions.unsubscribe()
	'unsubscribe',
	// subscriptions.update()
	'subscribe_update',

	// payments.payByQr()
	'payqr',
	// payments.createStaticQr()
	'staticQrCreate',

	// payments.payByToken()
	'paytoken',

	// payments.payByCash()
	'paycash',

	// payments.invoke2Factor()
	'hold',
	// payments.complete2Factor()
	'hold_completion',

	// available in checkout, payment widget, pay2Factor, payByCard, payByQr, payByToken
	'paysplit',

	// invoices.send()
	'invoice_send',
	// invoices.cancel()
	'invoice_cancel',

	// DCC - payments.payWithCardCurrency()
	'pay',

	// transferring funds from account to card - transfers.toCard()
	'p2pcredit',

	// transferring funds from card to account - transfers.toAccount()
	'p2pdebit',

	// token (without payment)
	// tokens.create()
	'token_create',
	// tokens.createUnique()
	'token_create_unique',
	// tokens.update()
	'token_update',

	// 3D Secure verification
	// verifications.3DSecure()
	'confirm',

	// OTP verification
	// verifications.OTP()
	'confirm',

	// check sender card for 3D Secure
	// verifications.checkFor3DSecure()
	'mpi',

	// CVV verification
	// verifications.CVV()
	'confirm',

	// card verification (is card valid)
	// verifications.isCardValid()
	'cardverification',

	// get archive of all accepted payments
	// information.getPaymentsReport()
	'reports',

	// get register of accepted payments for enterprises (check more)
	// information.getCompensationsReportByDay()
	'reports_compensation',
	// information.getCompensationsReportByDate()
	'register',
	// information.getFullCompensationsReport() and information.getCompensationsReportByP2POperation()
	'reports_compensation_file',
	// information.getFullCompensationsReportStatus() and information.getCompensationsReportByP2POperationStatus()
	'reports_compensation_file_status',

	// payments.addData()
	'data',

	// payments.sendTicket()
	'ticket',

	// payments.getStatus()
	'status',

	// company creation (check more)
	// companies.create()
	'agent_shop_create',
	// companies.register()
	'agent_shop_register',

	// company edit
	// companies.update()
	'agent_shop_edit',

	// company info
	// companies.getInfo()
	'agent_info_merchant',

	// partner info
	// companies.getUserInfo()
	'agent_info_user',

	// + exchange rates and currency exchange rate archive (public API - don't need action)

	// can be in responses/callback
	'pay',
	'hold',
	'paysplit',
	'subscribe',
	'paydonate',
	'auth',
	'regular',
])
export type Action = z.infer<typeof ActionSchema>
