import { z } from 'zod'

import { UnitSchema } from './enums'

export const TaxRates = {
	NO_VAT: { letter: 'А', name: 'Без ПДВ 0%', type: 0, prc: 0 },
	VAT20: { letter: 'Б', name: 'ПДВ 20%', type: 0, prc: 20 },
	VAT7: { letter: 'В', name: 'ПДВ 7%', type: 0, prc: 7 },
	EXCISE5: { letter: 'Г', name: 'АКЦИЗ 5%', type: 1, prc: 5 },
} as const

export type TaxRateKey = keyof typeof TaxRates
export type FiscalTax = (typeof TaxRates)[TaxRateKey]

export const FiscalTaxSchema = z.object({
	letter: z.string(),
	name: z.string(),
	type: z.number(),
	prc: z.number(),
})

export const FiscalProductByIdSchema = z.object({
	amount: z.number(),
	cost: z.number(),
	id: z.number(),
	price: z.number(),
})

export type FiscalProductById = z.infer<typeof FiscalProductByIdSchema>

export const FiscalProductByApiSchema = z.object({
	amount: z.number(),
	cost: z.number(),
	price: z.number(),
	categoryname: z.string(),
	name: z.string(),
	unitcode: UnitSchema,
	barcode: z.string().optional(),
	codifier: z.string().optional(),
	vndcode: z.string().optional(),
	taxs: z.array(FiscalTaxSchema).optional(),
})

export type FiscalProductByApi = z.infer<typeof FiscalProductByApiSchema>

export const FiscalDataSchema = z.object({
	items: z
		.array(z.union([FiscalProductByIdSchema, FiscalProductByApiSchema]))
		.optional(),
	delivery_emails: z.array(z.string()).optional(),
})

export type FiscalData = z.infer<typeof FiscalDataSchema>
