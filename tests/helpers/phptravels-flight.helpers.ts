import { expect, type Locator, type Page } from '@playwright/test';
import { phpTravelsFlightData } from '../../test-data/phptravels.flight.test-data';
export async function openFlights(page: Page): Promise<{ flightsTab: Locator; panel: Locator }> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await page.goto(`${phpTravelsFlightData.url}#flights`, { waitUntil: 'domcontentloaded' });
    const modal = page.locator('#demoWarningModal');
    const continueButton = modal.getByRole('button', { name: /I Understand & Continue/i });
    await continueButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => undefined);
    if (await continueButton.isVisible().catch(() => false)) { await continueButton.click({ force: true, timeout: 15000 }); await page.keyboard.press('Escape').catch(() => undefined); }
    const flightsTab = page.getByRole('tab', { name: /flight_takeoff\s*Flights/i });
    await expect(flightsTab).toBeVisible({ timeout: 15000 }); await flightsTab.click({ force: true, timeout: 15000 });
    const panel = page.getByRole('tabpanel'); await expect(panel).toBeVisible({ timeout: 15000 });
    try { await expect(panel.getByRole('button', { name: /Search Flights/i })).toBeVisible({ timeout: 15000 }); return { flightsTab, panel }; } catch (error) { if (attempt === 1) throw error; }
  }
  throw new Error('Flight search panel did not become ready.');
}
