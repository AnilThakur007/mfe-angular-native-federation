# Angular MFE with Native Federation + Tailwind CSS

Two independent Angular applications demonstrating Micro Frontends using **Native Federation**.

- **remote-app** (port 4201): Exposes a `ProductList` component (no "Component" suffix – that's fine!)
- **host-app** (port 4200): Dynamically loads the `ProductList` component via Native Federation.

## 🚀 Run Locally

```bash
# Terminal 1 – Remote
cd remote-app
npm install
ng serve --port 4201

# Terminal 2 – Host
cd host-app
npm install
ng serve --port 4200
