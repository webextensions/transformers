# 10. Express server (`server/application.js`)

**CLI:** [`server/server.js`](../../../server/server.js) — `--config <path>` passed to `application.start({ configOptionsFileRootRelativePath })`. Scripts always pass a config file.

---

## 10.1 Startup

1. Project root: `Path.join(__dirname, '..')`.
2. `require('../' + configPath)` — path **must** resolve.

---

## 10.2 Middleware order (summary)

1. Optional verbose request / `res.on('finish')` response logging (partial TODO for cleanup).
2. `extend(true, {}, config)` clone inside block.
3. **Non-production:** `express-network-delay(min, max)` from `nonProductionDevTools.networkDelay`.
4. `compression()`.
5. Optional **`express-redirect-to-https`**.
6. Optional **`express-redirect-to-www`**.
7. **`helmet`:** If HTTPS off or `skipHSTS`, disable HSTS (avoid browser sticky HTTPS on custom ports). If `skipUpgradeInsecureRequests`, tweak CSP; optional extra CSP with `childSrc: ['blob: *']` for Ace.
8. **`serve-favicon`** if `favicon.ico` under `publicDirectory`.
9. **`express-hard-coded-response`** if `hardCodedResponses` configured (dev).
10. **`basic-auth`** if `limitAccessWithBasicAuth` (skip `/.well-known/*`).
11. **`matchRequest`** → header `Test: 123`.
12. **`express.static(publicDirectory)`:** `dotfiles: 'ignore'`; `setHeaders` — long cache `*.[20-hex-chars].{css,js}`, `ensure-freshness` pattern, else `max-age=0`.
13. **`bodyParser.json()`**, **`urlencoded({ extended: true })`**.
14. **`routeSetup`:** stub `/admin`, `/user-account`; **after 1 s** catch-all `404` so live-css attaches first.

---

## 10.3 HTTP / HTTPS

- Enable flags + ports from `server.access.url.http` / `https`.
- Same port HTTP + HTTPS → HTTP disabled, warning log.
- **`get-port`** optional range fallback (`fallbackToAvailablePort`).
- HTTPS: key/cert (+ optional CA array) paths relative project root.
- **Neither enabled → `process.exit(1)`.**

---

## 10.4 Live CSS

If `nonProductionDevTools.useLiveCssEditor`: `@webextensions/live-css` with `expressApp: router`, `httpServer`, `Path.resolve(..., '.live-css.config.js')`.

---

**Prev:** [09-styling.md](./09-styling.md) · **Next:** [11-webpack-and-configuration.md](./11-webpack-and-configuration.md)  
**Index:** [README.md](./README.md)
