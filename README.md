# Angular Micro Frontends with Native Federation + Tailwind CSS

A production-ready **Micro Frontend (MFE)** architecture built with **Angular 21**, **Native Federation**, and **Tailwind CSS**. Two independently deployable Angular applications communicate via module federation — the host shell dynamically loads remote components at runtime without any build-time coupling.

---

## Architecture Overview

```
mfe-angular-native-federation/
├── host-app/        # Shell app (port 4200) — loads remote components at runtime
└── remote-app/      # MFE app (port 4201) — exposes ProductList component
```

### How It Works

```
Browser
  └── host-app (port 4200)
        └── [Native Federation] fetches remoteEntry.json from remote-app
              └── remote-app (port 4201)
                    └── exposes ./ProductList → ProductList component
```

- **remote-app** builds and serves its own `remoteEntry.json` manifest
- **host-app** reads that manifest at runtime and dynamically imports the `ProductList` component
- Shared libraries (Angular core, RxJS, etc.) are deduplicated via `shareAll` — loaded only once

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Angular | 21.2.x | Application framework |
| @angular-architects/native-federation | 21.2.x | Module federation for Angular |
| Tailwind CSS | 3.4.x | Utility-first styling |
| TypeScript | 5.9.x | Type safety |
| Vitest | 4.x | Unit testing |

---

## Prerequisites

- Node.js >= 20.x
- npm >= 11.x
- Angular CLI >= 21.x (`npm install -g @angular/cli`)

---

## Run Locally

Both apps must be running simultaneously. Open two terminal windows:

**Terminal 1 — Start the Remote App**
```bash
cd remote-app
npm install
ng serve --port 4201
```

**Terminal 2 — Start the Host App**
```bash
cd host-app
npm install
ng serve --port 4200
```

Then open your browser at `http://localhost:4200`.

The host app will automatically load the `ProductList` component from the remote app running on port 4201.

---

## What the Remote Exposes

The `remote-app` exposes a single component via Native Federation:

| Federation Key | Source File | Description |
|----------------|-------------|-------------|
| `./ProductList` | `src/app/product-list/product-list.ts` | Product listing with category filter and cart |

The `ProductList` component displays 8 products across three categories (Footwear, Clothing, Electronics) with:
- Category filter tabs
- Add to cart functionality
- Product badges (Best Seller, New, Sale)
- Tailwind CSS styling

---

## Federation Configuration

**remote-app** (`federation.config.js`) — exposes components:
```js
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

**host-app** (`federation.config.js`) — consumes remotes (configured in `app.routes.ts`):
```js
module.exports = withNativeFederation({
  name: 'host-app',
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

---

## Build for Production

```bash
# Build remote app first
cd remote-app && ng build

# Then build host app
cd host-app && ng build
```

Artifacts are output to each app's `dist/` folder.

---

## Running Tests

```bash
# In either app directory
ng test
```

Tests run with [Vitest](https://vitest.dev/).

---

## Key Concepts

- **Native Federation** is a standards-based alternative to Webpack Module Federation, using native ES modules and import maps — no Webpack required.
- **`shareAll`** ensures Angular, RxJS, and other heavy libraries are loaded only once across all federated apps, preventing version conflicts.
- **`singleton: true`** forces a single shared instance of each library, critical for Angular's dependency injection to work correctly across MFE boundaries.
