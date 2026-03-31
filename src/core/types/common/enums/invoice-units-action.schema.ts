import z from 'zod'

export const InvoiceUnitsActionSchema = z.enum([
	'invoice_units_get_list',
	'invoice_units_get_list_by_lang',
])
export type InvoiceUnitsAction = z.infer<typeof InvoiceUnitsActionSchema>
