# Lessons Learned

## API de registro

- Endpoint: `POST https://api.practicesoftwaretesting.com/users/register`
- El campo `address` no es un string — se envían campos separados: `street`, `city`, `state`, `postcode`, `house_number`, `country`
- Error al usar `address: 'string'` → 422: `"The address field must be an array"`

## Passwords rechazadas por data leak

Las siguientes contraseñas son rechazadas por el sitio:
- `Test12345!`, `T3st12345@`, `Wdio@Epam2026#`

Usar: `Xk9#mQ2$vL7pZw`

## waitForURL no funciona en esta SPA

El sitio no actualiza la URL al buscar — es Angular con routing client-side.

```js
// ❌ No funciona
await page.waitForURL('**/?q=Hammer**')

// ✅ Funciona
const res = page.waitForResponse(r => r.url().includes('/products/search'))
await searchButton.click()
await res
```

## Timeouts por browser

WebKit y Firefox cargan más lento que Chromium. Configurar en `playwright.config.js`:

```js
actionTimeout: 15000,
navigationTimeout: 30000,
workers: 1,
```

Y en assertions críticas usar `{ timeout: 15000 }`.

## Clicks bloqueados por overlays

```js
// ❌ Falla si hay overlay
await element.click()

// ✅ Bypasea el overlay
await element.click({ force: true })
```

## Esperar elementos antes de interactuar

```js
// En ProductPage.setQuantity — sin espera falla en webkit
await this.quantityInput.waitFor({ state: 'visible', timeout: 20000 })
await this.quantityInput.fill(quantity)
```

## Credenciales compartidas entre setup y specs

Usar un archivo `credentials.js` para no duplicar email/password entre `auth.setup.js` y `login.spec.js`.

```js
// tests/credentials.js
const TEST_EMAIL = 'testuser3@epam.com'
const TEST_PASSWORD = 'Xk9#mQ2$vL7pZw'
module.exports = { TEST_EMAIL, TEST_PASSWORD }
```
