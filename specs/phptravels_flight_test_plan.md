# PHPTRAVELS Flight Test Plan

## Application Overview

Test plan for the PHPTRAVELS homepage Flights tab and flight-search workflow only. Hotel stays, visa, AI Trip Planner, app links, login, signup, footer pages, and unrelated payment or booking functionality are out of scope. The live homepage confirms the Flights tab, while the detailed flight form and supplier behavior require validation when the tab is activated.

## Test Scenarios

### 1. Flight Tab and Search Form

**Seed:** `tests/seed.spec.ts`

#### 1.1. Display the Flights tab on the homepage

**File:** `tests/phptravels-flight/flight-tab.spec.ts`

**Steps:**
  1. Open https://phptravels.net/ in a fresh browser context.
    - expect: The PHPTRAVELS homepage loads successfully.
    - expect: The primary travel search area is visible.
  2. Inspect the primary travel search tabs.
    - expect: A tab named Flights is visible.
    - expect: Hotel, Visa, and AI Trip Planner controls are not included in the scope of this test.

#### 1.2. Activate the Flights tab

**File:** `tests/phptravels-flight/flight-tab.spec.ts`

**Steps:**
  1. Open the homepage in a fresh browser context.
    - expect: The homepage loads successfully.
  2. Select the Flights tab.
    - expect: The Flights tab becomes active.
    - expect: The page remains within the flight-search experience.
    - expect: A flight-search panel or form is displayed.

#### 1.3. Verify flight search form controls

**File:** `tests/phptravels-flight/flight-search-form.spec.ts`

**Steps:**
  1. Open the homepage and activate the Flights tab.
    - expect: The Flights tab is active.
  2. Inspect the displayed flight-search form.
    - expect: Configured trip-type controls are visible, if supported.
    - expect: Origin and destination controls are visible.
    - expect: Departure-date control is visible.
    - expect: Return-date control is visible for round trips, if supported.
    - expect: Passenger controls are visible.
    - expect: Cabin-class control is visible, if supported.
    - expect: A search or submit control is visible.

### 2. Flight Search Validation

**Seed:** `tests/seed.spec.ts`

#### 2.1. Prevent submission with missing required fields

**File:** `tests/phptravels-flight/flight-validation.spec.ts`

**Steps:**
  1. Open the homepage, activate Flights, and submit the empty flight form.
    - expect: The search is not submitted.
    - expect: Required-field validation messages are shown for missing fields.
    - expect: The messages identify how the user can correct the form.

### 3. Flight Search Results and Resilience

**Seed:** `tests/seed.spec.ts`

#### 3.1. Submit a valid flight search

**File:** `tests/phptravels-flight/flight-results.spec.ts`

**Steps:**
  1. Activate Flights and complete the form with a supported route, valid future dates, passenger values, and cabin class where available.
    - expect: All required fields contain valid values.
  2. Submit the flight search.
    - expect: A loading indicator is displayed while results are retrieved.
    - expect: The request is not blocked by client-side validation.

### 4. Flight Accessibility and Responsive Behavior

**Seed:** `tests/seed.spec.ts`

#### 4.1. Use the flight form with keyboard navigation

**Steps:**
  1. Activate the Flights tab using only the keyboard.
    - expect: The Flights tab can receive focus and be activated.
  2. Navigate through flight fields and controls using the keyboard.
    - expect: Focus moves in a logical order.
    - expect: All interactive flight controls can be reached and operated.

#### 4.2. Use the flight search on mobile viewports

**Steps:**
  1. Open the site at each supported mobile viewport.
    - expect: The homepage and Flights tab remain accessible.
  2. Activate Flights and inspect the flight form.
    - expect: The form fits within the viewport without overlapping controls.
    - expect: Fields and the search action remain usable.
