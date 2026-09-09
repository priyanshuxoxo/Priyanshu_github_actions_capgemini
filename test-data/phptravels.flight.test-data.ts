export type FlightTripType = 'one-way' | 'round-trip' | 'multi-city';
export type CabinClass = 'economy' | 'premium-economy' | 'business' | 'first';
export interface FlightRoute { origin: string; destination: string; }
export interface FlightSearchData extends FlightRoute { tripType: FlightTripType; departureDate: string; returnDate?: string; adults: number; children: number; infants: number; cabinClass: CabinClass; }
const formatDate = (date: Date): string => date.toISOString().slice(0, 10);
const addDays = (days: number): string => { const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + days); return formatDate(date); };
export const phpTravelsFlightData = {
  url: 'https://phptravels.net/', tabs: { flights: 'Flights' },
  supportedTripTypes: ['one-way', 'round-trip', 'multi-city'] as FlightTripType[],
  validRoutes: [{ origin: 'Dubai', destination: 'Paris' }, { origin: 'New York', destination: 'London' }, { origin: 'Barcelona', destination: 'Tokyo' }, { origin: 'San Francisco', destination: 'Dubai' }] as FlightRoute[],
  validSearches: [
    { origin: 'Dubai', destination: 'Paris', tripType: 'round-trip', departureDate: addDays(30), returnDate: addDays(37), adults: 2, children: 0, infants: 0, cabinClass: 'economy' },
    { origin: 'New York', destination: 'London', tripType: 'one-way', departureDate: addDays(45), adults: 1, children: 0, infants: 0, cabinClass: 'business' },
    { origin: 'Barcelona', destination: 'Tokyo', tripType: 'round-trip', departureDate: addDays(60), returnDate: addDays(74), adults: 2, children: 1, infants: 0, cabinClass: 'premium-economy' },
  ] as FlightSearchData[],
  invalidSearches: { emptyOrigin: { origin: '', destination: 'Paris' }, emptyDestination: { origin: 'Dubai', destination: '' }, identicalRoute: { origin: 'Dubai', destination: 'Dubai' }, unsupportedOrigin: { origin: 'Invalid Airport 999', destination: 'Paris' }, unsupportedDestination: { origin: 'Dubai', destination: 'Invalid Airport 999' }, whitespaceOrigin: { origin: '   ', destination: 'Paris' }, whitespaceDestination: { origin: 'Dubai', destination: '   ' } } satisfies Record<string, FlightRoute>,
  invalidDates: { pastDepartureDate: addDays(-1), pastReturnDate: addDays(-1), validDepartureDate: addDays(20), returnBeforeDepartureDate: addDays(19), sameDayReturnDate: addDays(20) },
  passengerBoundaries: { minimumAdults: 1, validAdults: 2, maximumAdults: 9, belowMinimumAdults: 0, aboveMaximumAdults: 10, validChildren: 1, validInfants: 1 },
  cabinClasses: ['economy', 'premium-economy', 'business', 'first'] as CabinClass[],
  boundarySearches: { minimumPassengerSearch: { origin: 'Dubai', destination: 'Paris', tripType: 'one-way', departureDate: addDays(14), adults: 1, children: 0, infants: 0, cabinClass: 'economy' }, maximumPassengerSearch: { origin: 'Dubai', destination: 'Paris', tripType: 'round-trip', departureDate: addDays(90), returnDate: addDays(97), adults: 9, children: 0, infants: 0, cabinClass: 'economy' }, sameDayReturnSearch: { origin: 'Dubai', destination: 'Paris', tripType: 'round-trip', departureDate: addDays(21), returnDate: addDays(21), adults: 1, children: 0, infants: 0, cabinClass: 'economy' } } satisfies Record<string, FlightSearchData>,
  noResultSearch: { origin: 'Dubai', destination: 'Remote Test Airport', tripType: 'one-way' as FlightTripType, departureDate: addDays(365), adults: 1, children: 0, infants: 0, cabinClass: 'economy' as CabinClass } satisfies FlightSearchData,
  keyboardOrder: ['Flights tab', 'Trip type', 'Origin', 'Destination', 'Departure date', 'Return date', 'Passengers', 'Cabin class', 'Search'], mobileViewports: [{ name: 'iPhone 12', width: 390, height: 844 }, { name: 'Pixel 5', width: 393, height: 851 }, { name: 'Galaxy S8', width: 360, height: 740 }], expectedResultFields: ['airline', 'departure airport', 'departure time', 'arrival airport', 'arrival time', 'duration', 'stops', 'cabin class', 'fare', 'currency'], errorScenarios: { supplierUnavailable: 'flight supplier unavailable', searchTimeout: 'flight search timeout', networkFailure: 'flight search network failure' }, invalidInputSamples: ['', '   ', 'Invalid Airport 999', '<script>alert("xss")</script>', "' OR 1=1 --", 'A'.repeat(256)]
} as const;
export const phpTravelsFlightValidSearches = phpTravelsFlightData.validSearches;
export const phpTravelsFlightInvalidSearches = phpTravelsFlightData.invalidSearches;
export const phpTravelsFlightRoutes = phpTravelsFlightData.validRoutes;
export const phpTravelsFlightMobileViewports = phpTravelsFlightData.mobileViewports;
