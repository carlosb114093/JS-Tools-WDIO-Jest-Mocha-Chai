# WDIO Test Automation Framework

Automated E2E test suite for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com) using WebdriverIO + Mocha + Chai.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [WebdriverIO](https://webdriver.io/) | v9 | E2E test runner |
| [Mocha](https://mochajs.org/) | v9 | Test framework |
| [Chai](https://www.chaijs.com/) | v4 | Assertion library |
| ChromeDriver | latest | Browser automation |

## Chai interfaces used

- **assert** — `search.spec.js`, `login.spec.js`, `favorites.spec.js`, `checkout.spec.js`
- **expect** — `product-det.spec.js`, `cart.spec.js`, `filter-sort.spec.js`
- **should** — `user-profile.spec.js`

## Test Scenarios

| File | Tag | Description |
|------|-----|-------------|
| `search.spec.js` | `@search` | Search bar filters products by keyword |
| `login.spec.js` | `@signup_signin` | Customer logs in with valid credentials |
| `favorites.spec.js` | `@favorites` | Logged-in customer marks product as favorite |
| `user-profile.spec.js` | `@user_profile` | Customer edits profile information |
| `product-det.spec.js` | `@product_details` | Product detail page loads correctly |
| `cart.spec.js` | `@basket` | Cart quantity updates after adding product |
| `filter-sort.spec.js` | `@filter_sort` | Filter by category and sort by price |
| `checkout.spec.js` | `@checkout` | Customer completes a purchase |

## Setup

### Prerequisites
- Node.js >= 18
- Google Chrome (latest)

### Test user setup

Several tests (login, favorites, checkout) require an authenticated user. Follow these steps before running the suite:

1. Go to [https://practicesoftwaretesting.com/auth/register](https://practicesoftwaretesting.com/auth/register)
2. Create an account with these exact credentials:
   - **Email:** `testuser3@epam.com`
   - **Password:** `T3st12345@`
3. After registering, log in and go to **Account → Profile**
4. Fill in all profile fields (required for the checkout test):
   - First name, Last name, Phone, Street, City, State, Country

> If you prefer to use a different email, update the credentials in every spec file that uses login: `favorites.spec.js`, `login.spec.js`, `checkout.spec.js`.

### Install dependencies

```bash
npm install
```

## Run tests

### Run all tests
```bash
npx wdio run wdio.conf.js
```

### Run a single spec
```bash
npx wdio run wdio.conf.js --spec test/specs/search.spec.js
```

## Project structure

```
mi-proyecto-wdio/
├── test/
│   └── specs/
│       ├── search.spec.js
│       ├── login.spec.js
│       ├── favorites.spec.js
│       ├── user-profile.spec.js
│       ├── product-det.spec.js
│       ├── cart.spec.js
│       ├── filter-sort.spec.js
│       └── checkout.spec.js
├── wdio.conf.js
├── package.json
└── README.md
```
