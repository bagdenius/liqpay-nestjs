/**
 * Contract of data of Long Detail Addenda entry. __Required for merchants with MCC 4511__.
 */
export interface DetailAddenda {
	/**
	 * Airline abbreviation, max 4 characters
	 */
	airLine: string

	/**
	 * Reservation number (locator), max 15 characters
	 */
	ticketNumber: string

	/**
	 * Passenger name, max 29 characters
	 */
	passengerName: string

	/**
	 * Flight number, max 5 digits
	 */
	flightNumber: string

	/**
	 * Departure city/airport code, max 5 characters
	 */
	originCity: string

	/**
	 * Destination city/airport code, max 5 characters
	 */
	destinationCity: string

	/**
	 * Departure date in YYMMDD format, max 6 digits
	 */
	departureDate: string
}
