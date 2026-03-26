import { z } from 'zod'

export const LiqPayDetailAddendaSchema = z.object({
	airLine: z.string().max(4),
	ticketNumber: z.string().max(15),
	passengerName: z.string().max(29),
	flightNumber: z.string().max(5),
	originCity: z.string().max(5),
	destinationCity: z.string().max(5),
	departureDate: z.string().max(6), // todo: strengthen with regex
})

export type LiqPayDetailAddenda = z.infer<typeof LiqPayDetailAddendaSchema>
