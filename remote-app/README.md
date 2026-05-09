# remote-app — MFE Remote

The **remote application** is an independently deployable Micro Frontend that runs on **port 4201**. It exposes the `ProductList` component via **Angular Native Federation**, which the host app loads dynamically at runtime.

---

## Role in the Architecture

```
remote-app (port 4201)
  └── Serves remoteEntry.json  ← host-app reads this at runtime
        └── Exposes ./ProductList → src/app/product-list/product-list.ts
```

This app can be developed, tested, and deployed **completely independently** of the host. It serves its own `remoteEntry.json` manifest that tells consumers what it exposes and which libraries it shares.

---

## Tech Stack

| Tool | Version |
|------|---------|
| Angular | 21.2.x |
| @angular-architects/native-federation | 21.2.x |
| Tailwind CSS | 3.4.x |
| TypeScript | 5.9.x |
| Vitest | 4.x |

---

## Prerequisites

- Node.js >= 20.x
- npm >= 11.x
- Angular CLI >= 21.x

---

## Getting Started

```bash
npm install
ng serve --port 4201
```

The app is available at `http://localhost:4201` as a standalone Angular app, and also serves its federation manifest at `http://localhost:4201/remoteEntry.json`.

---

## What This App Exposes

Configured in `federation.config.js`:

| Federation Key | Component | Description |
|----------------|-----------|-------------|
| `./ProductList` | `ProductList` | Product grid with category filter and cart |

### ProductList Component

Located at `src/app/product-list/product-list.ts`. Features:

- **8 products** across 3 categories: Footwear, Clothing, Electronics
- **Category filter** tabs to narrow the product grid
- **Add to Cart** button with a running cart count
- **Product badges**: Best Seller, New, Sale — each with a distinct colour
- Fully styled with **Tailwind CSS**

---

## Federation Configuration

`federation.config.js`:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'remoteApp',
  exposes: {
    './ProductList': './src/app/product-list/product-list.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

`shareAll` ensures Angular core, RxJS, and other heavy libraries are shared with the host — loaded only once in the browser regardless of how many MFEs are running.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `ng serve --port 4201` | Start development server on port 4201 |
| `ng build` | Production build → `dist/remote-app/` |
| `ng build --watch` | Watch mode build for development |
| `ng test` | Run unit tests with Vitest |
| `ng e2e` | Run end-to-end tests (requires e2e framework) |

---

## Project Structure

```
remote-app/
├── src/
│   ├── app/
│   │   ├── app.ts                          # Root component (standalone shell)
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   ├── app.scss
│   │   └── product-list/
│   │       ├── product-list.ts             # Exposed federated component
│   │       ├── product-list.html
│   │       └── product-list.scss
│   ├── index.html
│   ├── bootstrap.ts
│   ├── main.ts
│   └── styles.scss
├── federation.config.js                    # Native Federation remote config
├── angular.json
├── tailwind.config.js
└── tsconfig.json
```

---

## Building for Production

```bash
ng build
```

Output is placed in `dist/remote-app/`. The `remoteEntry.json` in the build output must be reachable by the host app. Update the host's remote URL configuration to point to the deployed remote entry URL.
