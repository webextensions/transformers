# 7. Mode registry and operation schema

---

## 7.1 `modes/index.js`

Imports [`modeCss`](../../../src/App/Dashboard/MainEditor/modes/modeCss/index.js), `modeCsv`, `modeHtml`, `modeJson`, `modeLess`, `modeText`; builds **`arrModeConfigs`** (fixed order) and **`obModeConfigs[modeId]`**.

---

## 7.2 Each `modeXxx/index.js`

Exports object with:

- `modeId`, `modeNameForAceEditor`, `title`, `icon`, `hasSyntaxHighlighting`
- `snippets`, `operations: [{ optgroupLabel, options: [configs] }]`
- **`arrOperations`** — concat all options arrays
- **`obOperations`** — `{ [operationId]: config }`

---

## 7.3 `constOperations.js`

- `mode_*` string constants, **`modes`** array for sanitization
- **`defaultRecommendedOperations`**, **`defaultSelectedOperations`**
- Re-export **`IconNotAvailable`**

---

## 7.4 Operation config schema (`config*.js`)

| Field | Notes |
|-------|------|
| `operationId` | Stable id (URL + storage). |
| `label`, `icon`, `iconTooltip` | UI + recent bar. |
| `snippets` | Optional per-operation sample. |
| `operationInputType` | `text` \| `json` \| `array-of-strings`. |
| `operationOutputType` | Same; **omit** → plain string handling (`jsonToLines`). |
| `performOperation` | `(params) => [err]` \| `[null, output]` \| `[null, output, extraInfo]` |

**Functional catalog:** [07-operations/README.md](../functional/07-operations/README.md)

---

**Prev:** [06-state-and-recent-ops.md](./06-state-and-recent-ops.md) · **Next:** [08-text-utils-and-lazy-loading.md](./08-text-utils-and-lazy-loading.md)  
**Index:** [README.md](./README.md)
