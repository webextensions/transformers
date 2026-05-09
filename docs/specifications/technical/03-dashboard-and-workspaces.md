# 3. Dashboard and workspaces

**Functional:** [02-workspaces.md](../functional/02-workspaces.md)

---

## 3.1 `Dashboard.js`

Thin wrapper around `ContentTabs`.

---

## 3.2 `ContentTabs.js`

**State**

- `useLocalStorage('transformers', '2', { raw: true })` → `'1'|'2'|'3'`.
- `selectedTabIndex` from stored value − 1.

**Mount-only `useEffect`**

- Reads `searchParams.get('transformers')`. If `'1'|'2'|'3'`, writes localStorage, sets tab index, marks workspace “initialized” so that tab’s subtree mounts. Runs **once** (empty deps).

**Render-time init (implementation quirk)**

- If stored workspace implies a tab not yet initialized, `setFirstTabInitialized` / etc. run **during render** (anti-pattern; current behavior).

**Tab change**

- Persists `transformers` as `(tabIndex + 1)` string; merges `getCurrentSearchParamsAsJson()` + `setSearchParams`.

**Lazy mounting**

- Each panel renders `SingleEditor` / `DoubleEditor` / `TripleEditor` only after that workspace initialized once—defers heavy Ace mounts.

---

## 3.3 `SingleEditor.js`

Heading “Input / Output”; one `MainEditor`, `allowFileInput`, full width/height. Ace ref stored but unused beyond assignment.

---

## 3.4 `DoubleEditor.js`

- Left: `MainEditor` `autoApply`, `onComputeOutput` → right `setValue`; `editorHeight="300px"`.
- Checkbox → `autoApply` state (default `true`).
- Swap: both refs `getValue` / `setValue`.
- Right: `hideOperations`, placeholder.

---

## 3.5 `TripleEditor.js`

`performABToC`: split A/B on `\n`; `append` | `difference` | `intersection` | `union` via [`lazyLoadLibraries.js`](../../../src/utils/lazyLoadLibraries/lazyLoadLibraries.js); `join('\n')` into C.

---

**Prev:** [02-frontend-entry-and-routing.md](./02-frontend-entry-and-routing.md) · **Next:** [04-search-params.md](./04-search-params.md)  
**Index:** [README.md](./README.md)
