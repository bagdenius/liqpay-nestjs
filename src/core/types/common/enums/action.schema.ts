import z from 'zod'

export const ActionSchema = z.enum([
	// --- PAYMENTS & CHECKOUT ---
	/**
	 * Used in: checkout, payments.pay(), payments.payBycard(), payments.payByApplePay(),
	 * payments.payByGooglePay(), DCC (payWithCardCurrency), callback responses
	 */
	'pay',

	/**
	 * Used in: payments.hold(), payments.holdByApplePay(), payments.holdByGooglePay(),
	 * payments.invoke2Factor(), callback responses
	 */
	'hold',

	/**
	 * Used in: payments.subscribe(), subscriptions.subscribe(), callback responses
	 */
	'subscribe',

	/**
	 * Used in: payments.donate(), callback responses
	 */
	'paydonate',

	/**
	 * For creating dynamic verification code. Can be in responses/callback
	 */
	'auth',

	/**
	 * Used in: refunds.refund()
	 */
	'refund',

	/**
	 * Used in: payments.payByPrivatPay()
	 */
	'payment_prepare',

	// --- SUBSCRIPTIONS ---
	/**
	 * Used in: subscriptions.unsubscribe()
	 */
	'unsubscribe',

	/**
	 * Used in: subscriptions.update()
	 */
	'subscribe_update',

	// --- QR & TOKENS & CASH ---
	// payments.payByQr()
	'payqr',
	// payments.createStaticQr()
	'staticQrCreate',
	// payments.payByToken()
	'paytoken',
	// payments.payByCash()
	'paycash',

	// --- 2FACTOR & SPLIT ---
	// payments.complete2Factor()
	'hold_completion',
	// available in checkout, payment widget, pay2Factor, payByCard, payByQr, payByToken, callback
	'paysplit',

	// --- INVOICES ---
	// invoices.send()
	'invoice_send',
	// invoices.cancel()
	'invoice_cancel',

	// --- TRANSFERS (P2P) ---
	// transferring funds from account to card - transfers.toCard()
	'p2pcredit',
	// transferring funds from card to account - transfers.toAccount()
	'p2pdebit',

	// --- TOKENS (WITHOUT PAYMENT) ---
	// tokens.create()
	'token_create',
	// tokens.createUnique()
	'token_create_unique',
	// tokens.update()
	'token_update',

	// --- VERIFICATIONS ---
	/**
	 * 3D Secure verification, OTP verification, CVV verification
	 */
	'confirm',

	/**
	 * check sender card for 3D Secure - verifications.checkFor3DSecure()
	 */
	'mpi',

	/**
	 * card verification (is card valid) - verifications.isCardValid()
	 */
	'cardverification',

	// --- REPORTS & INFO ---
	// get archive of all accepted payments - information.getPaymentsReport()
	'reports',
	// get register of accepted payments for enterprises
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

	// --- COMPANIES (AGENTS) ---
	// companies.create()
	'agent_shop_create',
	// companies.register()
	'agent_shop_register',
	// companies.update()
	'agent_shop_edit',
	// companies.getInfo()
	'agent_info_merchant',
	// companies.getUserInfo()
	'agent_info_user',

	// --- MISC ---
	// can be in responses/callback
	'regular',
])

export type Action = z.infer<typeof ActionSchema>

export type CheckoutAction = Extract<
	Action,
	'pay' | 'hold' | 'subscribe' | 'paydonate'
>

export type PaymentStatusAction = Extract<Action, 'status'>

export type RefundAction = Extract<Action, 'refund'>

export type VerificationAction = Extract<
	Action,
	'confirm' | 'mpi' | 'cardverification'
>

export type ReportAction = Extract<
	Action,
	| 'reports'
	| 'reports_compensation'
	| 'register'
	| 'reports_compensation_file'
	| 'reports_compensation_file_status'
>
