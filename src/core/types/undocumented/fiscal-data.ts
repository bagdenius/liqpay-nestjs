import { LiqPayFiscalTax, LiqPayUnit } from './types'

export interface LiqPayFiscalData {
	items?: LiqPayFiscalProductById[] | LiqPayFiscalProductByApi[]
	delivery_emails?: string[]
}

export interface LiqPayFiscalProductById {
	amount: number
	cost: number
	id: number
	price: number
}

export interface LiqPayFiscalProductByApi {
	amount: number
	cost: number
	price: number
	categoryname: string
	name: string
	unitcode: LiqPayUnit
	barcode?: string
	codifier?: string
	vndcode?: string
	taxs?: LiqPayFiscalTax[]
}
