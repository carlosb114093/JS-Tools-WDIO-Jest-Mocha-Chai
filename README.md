# Playwright Test Automation Framework

Automated E2E test suite for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com) using Playwright with multi-browser support.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev/) | ^1.61.1 | E2E test runner + browser automation |
| Node.js | >= 18 | Runtime |
| Chromium / Firefox / WebKit | latest | Cross-browser testing |

## Test Scenarios

| File | Tag | Description |
|------|-----|-------------|
| `login.spec.js` | `@signup_signin` | Registered user signs in with valid credentials |
| `cart.spec.js` | `@basket` | Customer adds product to basket and changes quantity |
| `product-details.spec.js` | `@product_details` | Customer opens product details page |
| `search.spec.js` | `@search` | Customer searches for exact product name |

## Setup

### Prerequisites
- Node.js >= 18
- Browsers installed via Playwright

### Install dependencies

```powershell
npm install
npx playwright install
```

## Run tests

### Run all tests (Chromium + Firefox + WebKit)
```powershell
npx playwright test
```

### Run a single spec
```powershell
npx playwright test tests/login.spec.js
```

### Run on a specific browser
```powershell
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Project structure

```
mi-proyecto-playwright/
├── pages/
│   ├── HomePage.js          # Home page object
│   ├── LoginPage.js         # Login page object
│   └── ProductPage.js       # Product detail page object
├── tests/
│   ├── auth.setup.js        # Global auth setup (register + login, saves state)
│   ├── credentials.js       # Shared test credentials
│   ├── cart.spec.js
│   ├── login.spec.js
│   ├── product-details.spec.js
│   └── search.spec.js
├── playwright.config.js
└── LESSONS_LEARNED.md
```

## Authentication

The `auth.setup.js` file runs once before all specs:
1. Registers a test account via the API (`POST /users/register`)
2. Logs in via the UI
3. Saves the session state to `state.json`

All specs that depend on authentication reuse this saved session — no manual account creation needed.

## Cross-browser notes

- Tests run sequentially (`workers: 1`) to avoid resource contention between browsers
- `actionTimeout: 15000ms` and `navigationTimeout: 30000ms` to accommodate slower browsers
- `retries: 2` handles occasional network flakiness on Firefox and WebKit
