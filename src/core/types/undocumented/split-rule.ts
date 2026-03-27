export interface LiqPaySplitRule {
	public_key: string
	amount: number
	commission_payer: LiqPayCommisionPayer
	server_url: string
	rro_info?: LiqPayFiscalData
}
