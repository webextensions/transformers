# Functional specification — index

**What the product does** from a user and behavior perspective (baseline **v0.6.7**). Companion: [Technical specification](../technical/README.md).

---

## Chapters

| # | Document | Contents |
|---|----------|----------|
| 1 | [01-overview.md](./01-overview.md) | Purpose, scope, out-of-scope, terminology |
| 2 | [02-workspaces.md](./02-workspaces.md) | Transformers I / II / III, browser dialog |
| 3 | [03-url-and-storage.md](./03-url-and-storage.md) | Query parameters, `localStorage` keys |
| 4 | [04-layout-and-chrome.md](./04-layout-and-chrome.md) | Header, tabs, footer |
| 5 | [05-main-editor-ux.md](./05-main-editor-ux.md) | Mode/operation UI, toolbar, recent ops |
| 6 | [06-apply-pipeline.md](./06-apply-pipeline.md) | Input/output types, errors, specials |
| 7 | [**07-operations/**](./07-operations/README.md) | Operations catalog **by mode** + defaults |
| 8 | [08-non-functional.md](./08-non-functional.md) | Performance, a11y, i18n expectations |
| 9 | [09-acceptance-criteria.md](./09-acceptance-criteria.md) | Regression-oriented checklist |

---

## Related technical chapters

| Functional topic | See technical |
|------------------|----------------|
| Workspaces layout | [03-dashboard-and-workspaces.md](../technical/03-dashboard-and-workspaces.md) |
| URL / search params | [04-search-params.md](../technical/04-search-params.md), [05-main-editor.md](../technical/05-main-editor.md) |
| Editor + apply | [05-main-editor.md](../technical/05-main-editor.md) |
| Recent operations | [06-state-and-recent-ops.md](../technical/06-state-and-recent-ops.md) |
| Operation implementations | [07-mode-registry-and-schema.md](../technical/07-mode-registry-and-schema.md), [08-text-utils-and-lazy-loading.md](../technical/08-text-utils-and-lazy-loading.md) |

---

**Up:** [Specifications home](../README.md)
