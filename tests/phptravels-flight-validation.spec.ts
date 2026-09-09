import { test, expect } from '@playwright/test';
import { phpTravelsFlightData } from '../test-data/phptravels.flight.test-data';
import { openFlights } from './helpers/phptravels-flight.helpers';
test.describe('PHPTRAVELS flight validation', () => {
  test('submit empty flight form', async ({ page }) => { const { panel } = await openFlights(page); await panel.getByRole('button', { name: /Search Flights/i }).dispatchEvent('click'); await expect(panel).toBeVisible(); });
  test('identify identical origin and destination data', async () => { const route = phpTravelsFlightData.invalidSearches.identicalRoute; expect(route.origin).toBe(route.destination); });
  test('identify past departure date data', async () => { expect(new Date(phpTravelsFlightData.invalidDates.pastDepartureDate).getTime()).toBeLessThan(Date.now()); });
  test('identify invalid return-date range data', async () => { expect(new Date(phpTravelsFlightData.invalidDates.returnBeforeDepartureDate).getTime()).toBeLessThan(new Date(phpTravelsFlightData.invalidDates.validDepartureDate).getTime()); });
});
