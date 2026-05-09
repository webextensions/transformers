# 3. URL query parameters and persistence

---

## 3.1 URL query parameters (shareable state)

Example: `?transformers=2&mode=json&operation=jsonFormat`

| Parameter | Allowed values | Behavior |
|-----------|----------------|----------|
| `transformers` | `1`, `2`, `3` | Selects workspace tab on **initial** load; invalid/missing → stored preference or default **2**. Valid value also **writes** `localStorage` `transformers`. |
| `mode` | `css`, `csv`, `html`, `json`, `less`, `text` | On **first mount** of a `MainEditor`, if valid, updates persisted mode and UI. Invalid/absent → stored mode (default `text`). |
| `operation` | Valid `operationId` for the **sanitized** mode | With URL `mode`, if invalid for that mode, implementation uses **first entry in** `arrOperations` (caveat: may not be product-default). See [05-main-editor.md](../technical/05-main-editor.md). |

User changes to mode/operation **merge** current query string and update `mode` / `operation`. Initial URL sync is mount-scoped; see technical spec for `useEffect` deps.

**Helper:** [04-search-params.md](../technical/04-search-params.md)

---

## 3.2 localStorage keys

| Key | Purpose |
|-----|--------|
| `transformers` | `'1'`, `'2'`, or `'3'` — last workspace. |
| `mode` | Current mode id. |
| `selectedOperations` | JSON object: each mode id → last `operationId` for that mode. |
| `flagSyntaxHighlighting` | `'yes'` or `'no'`. |
| `flagLineWrap` | `'yes'` or `'no'`. |
| `recentOperations` | JSON array of `operationId` (global order; UI filters by current mode). |

If `recentOperations` is missing or corrupt, implementation falls back to **default recommended** list. See [defaults.md](./07-operations/defaults.md) and [06-state-and-recent-ops.md](../technical/06-state-and-recent-ops.md).

---

**Prev:** [02-workspaces.md](./02-workspaces.md) · **Next:** [04-layout-and-chrome.md](./04-layout-and-chrome.md)  
**Index:** [README.md](./README.md)  
**Technical:** [05-main-editor.md](../technical/05-main-editor.md) (URL merge + `generateTargetSearchParamsAsJson`)
