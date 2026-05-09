# 6. Jotai and recent operations

---

## 6.1 `JotaiState.js`

- Reads `localStorage.getItem('recentOperations')`.
- `JSON.parse`; if result **not an array** → seed `defaultRecommendedOperations` from [`constOperations.js`](../../../src/App/Dashboard/MainEditor/constOperations.js).
- **Note:** Empty array `[]` is valid → recent list stays empty on reload (differs from invalid JSON path).
- Commented-out code would filter stale operation ids — **not enabled**.

---

## 6.2 `RecentOperations.js`

- Subscribes to `recentOperationsAtom`.
- Filters ids to those in `modeConfig.obOperations`.
- Icon: operation `icon` or `IconNotAvailable`.

---

## 6.3 Star reset quirk

Star sets atom to `defaultRecommendedOperations` but writes localStorage `recentOperations` to **`JSON.stringify([])`**. Until reload, UI shows recommended icons from atom; after reload, `[]` parses to empty array → **empty** recent bar (not recommended seed).

---

**Prev:** [05-main-editor.md](./05-main-editor.md) · **Next:** [07-mode-registry-and-schema.md](./07-mode-registry-and-schema.md)  
**Functional:** [05-main-editor-ux.md](../functional/05-main-editor-ux.md)
