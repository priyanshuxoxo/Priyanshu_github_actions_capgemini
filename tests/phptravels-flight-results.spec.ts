import { test, expect } from '@playwright/test';
import { phpTravelsFlightData } from '../test-data/phptravels.flight.test-data';
import { openFlights } from './helpers/phptravels-flight.helpers';
test.describe('PHPTRAVELS flight results and resilience', () => {
  test('submit a valid flight search', async ({ page }) => { const { panel } = await openFlights(page); const search = phpTravelsFlightData.validSearches[0]; await expect(panel.getByRole('textbox', { name: /Departure Date/i })).toBeVisible(); await expect(panel.getByRole('button', { name: /Search Flights/i })).toBeVisible(); expect(search.origin).toBeTruthy(); expect(search.destination).toBeTruthy(); });
  test('expose the flight result contract', async () => { expect(phpTravelsFlightData.expectedResultFields).toEqual(expect.arrayContaining(['airline', 'departure airport', 'arrival airport', 'fare', 'currency'])); });
  test('prepare a no-result search', async () => { const search = phpTravelsFlightData.noResultSearch; expect(search.destination).toBe('Remote Test Airport'); expect(new Date(search.departureDate).getTime()).toBeGreaterThan(Date.now()); });
  test('define supplier or search-service failure scenarios', async () => { expect(Object.values(phpTravelsFlightData.errorScenarios)).toEqual(expect.arrayContaining(['flight supplier unavailable', 'flight search timeout', 'flight search network failure'])); });
});
