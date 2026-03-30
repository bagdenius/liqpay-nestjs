import { FiscalTax, Unit } from './types'

export interface FiscalData {
	items?: FiscalProductById[] | FiscalProductByApi[]
	delivery_emails?: string[]
}

export interface FiscalProductById {
	amount: number
	cost: number
	id: number
	price: number
}

export interface FiscalProductByApi {
	amount: number
	cost: number
	price: number
	categoryname: string
	name: string
	unitcode: Unit
	barcode?: string
	codifier?: string
	vndcode?: string
	taxs?: FiscalTax[]
}
