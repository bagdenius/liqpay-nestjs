import { z } from 'zod'

import { LiqPayUnitSchema } from './enums'

export const LiqPayTaxRates = {
	NO_VAT: { letter: 'А', name: 'Без ПДВ 0%', type: 0, prc: 0 },
	VAT20: { letter: 'Б', name: 'ПДВ 20%', type: 0, prc: 20 },
	VAT7: { letter: 'В', name: 'ПДВ 7%', type: 0, prc: 7 },
	EXCISE5: { letter: 'Г', name: 'АКЦИЗ 5%', type: 1, prc: 5 },
} as const

export type LiqPayTaxRateKey = keyof typeof LiqPayTaxRates
export type LiqPayFiscalTax = (typeof LiqPayTaxRates)[LiqPayTaxRateKey]

export const LiqPayFiscalTaxSchema = z.object({
	letter: z.string(),
	name: z.string(),
	type: z.number(),
	prc: z.number(),
})

export const LiqPayFiscalProductByIdSchema = z.object({
	amount: z.number(),
	cost: z.number(),
	id: z.number(),
	price: z.number(),
})

export type LiqPayFiscalProductById = z.infer<
	typeof LiqPayFiscalProductByIdSchema
>

export const LiqPayFiscalProductByApiSchema = z.object({
	amount: z.number(),
	cost: z.number(),
	price: z.number(),
	categoryname: z.string(),
	name: z.string(),
	unitcode: LiqPayUnitSchema,
	barcode: z.string().optional(),
	codifier: z.string().optional(),
	vndcode: z.string().optional(),
	taxs: z.array(LiqPayFiscalTaxSchema).optional(),
})

export type LiqPayFiscalProductByApi = z.infer<
	typeof LiqPayFiscalProductByApiSchema
>

export const LiqPayFiscalDataSchema = z.object({
	items: z
		.array(
			z.union([LiqPayFiscalProductByIdSchema, LiqPayFiscalProductByApiSchema]),
		)
		.optional(),
	delivery_emails: z.array(z.string()).optional(),
})

export type LiqPayFiscalData = z.infer<typeof LiqPayFiscalDataSchema>
