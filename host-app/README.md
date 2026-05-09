# host-app — MFE Shell (Host)

The **host application** is the shell of this Micro Frontend architecture. It runs on **port 4200** and dynamically loads the `ProductList` component from the remote app at runtime using **Angular Native Federation**.

---

## Role in the Architecture

```
host-app (port 4200)
  └── Fetches remoteEntry.json from http://localhost:4201/remoteEntry.json
        └── Dynamically imports ProductList component from remote-app
```

The host has **no build-time dependency** on the remote app's source code. It only knows the federation contract (`remoteApp/ProductList`) and resolves it at runtime.

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

> The **remote-app must be running on port 4201** before starting the host, otherwise the dynamically loaded component will fail to resolve.

---

## Getting Started

```bash
npm install
ng serve --port 4200
```

Open `http://localhost:4200` in your browser.

---

## Federation Configuration

`federation.config.js` — the host shares Angular and RxJS with remotes but does not expose any modules itself:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'host-app',
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

The remote entry URL (`http://localhost:4201/remoteEntry.json`) and the component mapping (`remoteApp/ProductList`) are configured in the app's routing or bootstrap file.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `ng serve --port 4200` | Start development server on port 4200 |
| `ng build` | Production build → `dist/host-app/` |
| `ng build --watch` | Watch mode build for development |
| `ng test` | Run unit tests with Vitest |
| `ng e2e` | Run end-to-end tests (requires e2e framework) |

---

## Project Structure

```
host-app/
├── src/
│   ├── app/
│   │   ├── app.ts              # Root component
│   │   ├── app.html            # Root template
│   │   ├── app.routes.ts       # Routing — lazy loads remote ProductList
│   │   ├── app.config.ts       # App bootstrap config
│   │   └── app.scss
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── federation.config.js        # Native Federation host config
├── angular.json
├── tailwind.config.js
└── tsconfig.json
```

---

## Building for Production

```bash
ng build
```

Output is placed in `dist/host-app/`. Ensure the remote app is also built and its `remoteEntry.json` URL is updated to point to the production remote URL before deploying.
