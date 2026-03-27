import { z } from 'zod'

/**
 * Units of measurement of goods
 */
export enum LiqPayUnitEnum {
	meter = '10001',
	square_meter = '10002',
	cubic_meter = '10003',
	kilometer = '10004',
	square_kilometer = '10005',
	cubic_kilometer = '10006',
	decimeter = '10007',
	square_decimeter = '10008',
	cubic_decimeter = '10009',
	centimeter = '10010',
	square_centimeter = '10011',
	cubic_centimeter = '10012',
	hectare = '10013',
	liter = '10014',
	kilogram = '10015',
	gram = '10016',
	metric_ton = '10017',
	centner = '10018',
	kilowatt_hour = '10019',
	kilowatt = '10020',
	centner_per_hectare = '10021',
	head = '10022',
	notebook = '10023',
	book = '10024',
	copy = '10025',
	square_meter_residential = '10026',
	piece = '10027',
	box = '10028',
	cistern = '10029',
	crate = '10030',
	package = '10031',
	pack = '10032',
	roll = '10033',
	hryvnia = '10034',
	kilometer_per_hour = '10035',
	running_meter = '10036',
	product = '10037',
	set = '10038',
	day = '10039',
	service = '10040',
	hour = '10041',
	month = '10042',
	bottle = '10043',
	para = '10044',
	portion = '10045',
	minute = '10046',
	milliliter = '10047',
}

export const LiqPayUnitSchema = z.enum(LiqPayUnitEnum)

export type LiqPayUnit = z.infer<typeof LiqPayUnitSchema>
