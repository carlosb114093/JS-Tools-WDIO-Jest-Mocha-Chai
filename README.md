# Playwright Test Automation Framework

Automated E2E test suite for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com) using Playwright with multi-browser support (Chromium, Firefox, WebKit).

## Architecture

Layered architecture (Core / Business / Tests) following Page Object Model pattern and SOLID principles:

- **Core layer** (`core/`): Framework-agnostic wrappers — `BasePage` (browser interactions) and `ApiHelper` (API requests)
- **Business layer** (`business/pages/`): Page objects with application-specific logic, extending `BasePage`
- **Tests layer** (`tests/`): Test specs, authentication setup, and TAF configuration

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

### All browsers (Chromium + Firefox + WebKit)
```powershell
npm test
```

### Single browser
```powershell
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Single test file
```powershell
npm test -- tests/login.spec.js
```

### With headed browser (for debugging)
```powershell
npx playwright test --headed
```

### View test report
```powershell
npm run report
```

## Project structure

```
mi-proyecto-playwright/
├── core/
│   ├── BasePage.js              # Browser interaction wrappers (navigate, click, fill, retry)
│   └── ApiHelper.js             # API request wrapper
├── business/
│   └── pages/
│       ├── HomePage.js          # Home page object (search, openProduct)
│       ├── LoginPage.js         # Login page object (login, goto)
│       └── ProductPage.js       # Product page object (setQuantity, addToCart)
├── tests/
│   ├── playwright.config.js     # TAF configuration (browsers, retries, timeouts)
│   ├── auth.setup.js            # Global auth setup (register + login via API, saves state)
│   ├── credentials.js           # Shared test user credentials
│   ├── cart.spec.js
│   ├── login.spec.js
│   ├── product-details.spec.js
│   └── search.spec.js
├── package.json
├── .gitignore
└── README.md
```

## Authentication

The `auth.setup.js` file runs once before all specs:
1. Registers a test account via the API (`POST /users/register`)
2. Logs in via the UI
3. Saves the session state to `state.json`

All specs that depend on authentication reuse this saved session.

## Cross-browser configuration

- Tests run with `workers: 2` for parallel execution across browsers
- `actionTimeout: 15000ms` and `navigationTimeout: 30000ms` accommodate slower browsers
- `retries: 2` handles occasional network flakiness
- WebKit-specific retry logic in `HomePage.search()` and `ProductPage.addToCart()` handles Angular binding races
