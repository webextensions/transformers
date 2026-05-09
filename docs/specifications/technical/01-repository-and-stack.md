# 1. Repository layout and technology stack

**Version:** 0.6.7 ([`package.json`](../../../package.json))

---

## 1.1 Repository map

| Path | Role |
|------|------|
| [`src/index.js`](../../../src/index.js) | React 18 `createRoot`; mounts `AppWrapper`. |
| [`src/App/`](../../../src/App/) | UI shell → `Dashboard` → `ContentTabs` + editors. |
| [`src/App/Dashboard/MainEditor/`](../../../src/App/Dashboard/MainEditor/) | `MainEditor.js`, `modes/`, `constOperations.js`, `JotaiState.js`, `RecentOperations.js`, `textUtils.js`. |
| [`server/server.js`](../../../server/server.js) | CLI (`commander`): `--config` → `application.start`. |
| [`server/application.js`](../../../server/application.js) | Express, middleware, static, HTTP/HTTPS. |
| [`config/`](../../../config/) | Layered Node configs (`extend`) for server + webpack. |
| [`webpack/`](../../../webpack/) | `webpack-config-generator.js`, plugins. |
| [`webpack.config.js`](../../../webpack.config.js) | Reads `--env.config`, delegates to generator. |
| [`scripts/`](../../../scripts/) | Health checks, housekeeping, `gh-pages`. |
| [`test/application.test.js`](../../../test/application.test.js) | Mocha smoke load of `server/application.js`. |

---

## 1.2 Dependency stack (authoritative: `package.json`)

**UI:** `react` / `react-dom` 18, `prop-types`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`.

**Routing:** `react-router-dom` v7 (`createBrowserRouter`, `RouterProvider`, `useSearchParams`).

**State:** `jotai`; `react-use` `useLocalStorage`; React hooks.

**Feedback:** `notistack`.

**Debouncing:** `use-debounce`.

**Editor:** `react-ace`, `ace-builds`; lazy wrapper [`lazyLoadAceEditorComponent.js`](../../../src/utils/lazyLoadComponents/lazyLoadAceEditorComponent.js).

**Transforms:** `prettier`, `less`, `helpmate-css`, `json-2-csv`, `json-stable-stringify`, `punycode`, dynamic `lodash/*`.

**Server:** `express`, `compression`, `helmet`, `body-parser`, `serve-favicon`, `get-port`, optional `basic-auth`.

**Build:** Webpack 5, `babel-loader` + `@babel/preset-react`, `mini-css-extract-plugin`, `copy-webpack-plugin`.

**Logging:** `note-down` (`logger`) on server.

---

**Next:** [02-frontend-entry-and-routing.md](./02-frontend-entry-and-routing.md)  
**Index:** [README.md](./README.md)  
**Functional overview:** [01-overview.md](../functional/01-overview.md)
