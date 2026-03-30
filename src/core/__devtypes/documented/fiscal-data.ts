import { FiscalTax, Unit } from './types'

/**
 * Fiscalization data provided by ID contract
 */
export interface FiscalData {
	/**
	 * Data about the goods for which payment is made
	 */
	items?: FiscalProductById[] | FiscalProductByApi[]

	/**
	 * List of e-mails to which receipts should be sent after fiscalization
	 */
	delivery_emails?: string[]
}

/**
 * Contract of data about the product for which payment is being made provided by ID
 */
export interface FiscalProductById {
	/**
	 * Quantity/volume
	 */
	amount: number

	/**
	 * The cost of all units of the specified product in the check (`quantity * unit_cost`)
	 */
	cost: number

	/**
	 * Product identifier. You can get it in your `Liqpay account - PPO - Cash register - Products`
	 */
	id: number

	/**
	 * Unit price of the product
	 */
	price: number
}

/**
 * Contract of data about the product for which payment is being made provided by API
 */
export interface FiscalProductByApi {
	/**
	 * Quantity/volume
	 */
	amount: number

	/**
	 * The cost of all units of the specified product in the check (`quantity * unit_cost`)
	 */
	cost: number

	/**
	 * Unit price of the product
	 */
	price: number

	/**
	 * Category name
	 */
	categoryname: string

	/**
	 * Product name
	 */
	name: string

	/**
	 * Unit of measure code
	 */
	unitcode: Unit

	/**
	 * Digital value of the product barcode
	 */
	barcode?: string

	/**
	 * Code according to the UKTZED directory
	 */
	codifier?: string

	/**
	 * Internal product code
	 */
	vndcode?: string

	/**
	 * Tax rate for the product
	 */
	taxs?: FiscalTax[]
}
