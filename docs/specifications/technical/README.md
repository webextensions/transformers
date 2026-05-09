# Technical specification — index

**How the product is implemented** (baseline **v0.6.7** per `package.json`). Companion: [Functional specification](../functional/README.md).

---

## Chapters

| # | Document | Contents |
|---|----------|----------|
| 1 | [01-repository-and-stack.md](./01-repository-and-stack.md) | Paths, dependencies |
| 2 | [02-frontend-entry-and-routing.md](./02-frontend-entry-and-routing.md) | `AppWrapper`, `App`, dialogs |
| 3 | [03-dashboard-and-workspaces.md](./03-dashboard-and-workspaces.md) | `ContentTabs`, Single/Double/Triple editors |
| 4 | [04-search-params.md](./04-search-params.md) | `getCurrentSearchParamsAsJson` |
| 5 | [05-main-editor.md](./05-main-editor.md) | `MainEditor.js` props, state, `applyTheOperation` |
| 6 | [06-state-and-recent-ops.md](./06-state-and-recent-ops.md) | Jotai, `RecentOperations`, star reset |
| 7 | [07-mode-registry-and-schema.md](./07-mode-registry-and-schema.md) | `modes/index`, `constOperations`, config schema |
| 8 | [08-text-utils-and-lazy-loading.md](./08-text-utils-and-lazy-loading.md) | `textUtils`, lazy Ace / libs |
| 9 | [09-styling.md](./09-styling.md) | CSS modules, responsive helpers |
| 10 | [10-server.md](./10-server.md) | Express, middleware, HTTPS, live-css |
| 11 | [11-webpack-and-configuration.md](./11-webpack-and-configuration.md) | Webpack CLI, `config/` layering |
| 12 | [12-quality-todos-and-checklist.md](./12-quality-todos-and-checklist.md) | Tests, ESLint, TODOs, graph, new-operation checklist |

---

## Related functional chapters

| Technical topic | See functional |
|-----------------|----------------|
| User-visible workspaces | [02-workspaces.md](../functional/02-workspaces.md) |
| Shareable URL behavior | [03-url-and-storage.md](../functional/03-url-and-storage.md) |
| Toolbar / editor UX | [05-main-editor-ux.md](../functional/05-main-editor-ux.md) |
| Operation meanings | [07-operations/README.md](../functional/07-operations/README.md) |

---

**Up:** [Specifications home](../README.md)
