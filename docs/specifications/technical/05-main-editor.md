# 5. MainEditor (`MainEditor.js`)

**Source:** [`src/App/Dashboard/MainEditor/MainEditor.js`](../../../src/App/Dashboard/MainEditor/MainEditor.js)

**Functional UX:** [05-main-editor-ux.md](../functional/05-main-editor-ux.md) · **Apply contract:** [06-apply-pipeline.md](../functional/06-apply-pipeline.md)

---

## 5.1 Props (`propTypes`)

| Prop | Meaning |
|------|---------|
| `placeholder` | Ace placeholder; default `readable[mode]`. |
| `onLoad(editor)` | Ace ready. |
| `onValueUpdate(output)` | After successful apply with output. |
| `allowFileInput` | File picker → UTF-8 text. |
| `style` | Outer wrapper. |
| `editorWidth` / `editorHeight` | Ace dimensions. |
| `autoApply` | Debounced apply on change + effect when `operation`/`autoApply` change. |
| `onComputeOutput({ operation, output })` | Success path bypasses `setValue` on this editor. |
| `hideOperations` | Hides operation row / recent ops visibility. |

---

## 5.2 Mode / operation state

**localStorage:** `mode` (raw); `selectedOperations` (object), default from [`constOperations.js`](../../../src/App/Dashboard/MainEditor/constOperations.js).

**Mount `useEffect` (once):** Valid URL `mode` → `setStoredMode` + `setMode`.

**Per-render URL merge:** From `useSearchParams()`, sanitize mode (`modes` from `constOperations`); sanitize operation against `obModeConfigs[mode].obOperations` — invalid → **`arrOperations[0]`** (TODO in source).

**Mutation:** `selectedOperations[sanitizedMode] = sanitizedOperation` mutates object from `useLocalStorage` during render.

**Current operation:** `operation = selectedOperations[mode]` where `mode` is React state.

---

## 5.3 `generateTargetSearchParamsAsJson({ mode, operation, selectedOperations })`

Extends [getCurrentSearchParamsAsJson](./04-search-params.md):

- Sets `mode` when provided.
- Removes `operation` when missing/empty / `!selectedOperations[mode]` / `operation === ''`; else sets `operation`.

---

## 5.4 Ace configuration

- Syntax: map mode → Ace mode (`css`, `html`, `json`, `less`, `text`); disabled → `text`. CSV/text forced to Ace `text`.
- Theme `github`. `wrap` from `flagLineWrap`.
- Lazy: `React.lazy` → [`lazyLoadAceEditorComponent`](../../../src/utils/lazyLoadComponents/lazyLoadAceEditorComponent.js); Suspense + `Loading`.

---

## 5.5 `applyTheOperation(passedOperation?)`

1. **Recent ops:** `[operationToApply, ...recentOperations]` → dedupe → `setRecentOperations` + `localStorage.setItem('recentOperations', ...)`.

2. **Empty input:** output `''`; `onComputeOutput` or `setValue`; `onValueUpdate`; return.

3. **Parameters:** per `operationInputType` (`json` parse, `array-of-strings` split, else `inputText`).

4. **Call:** `[err, output, extraInfo] = await performOperation(parameters)`; try/catch → `err`.

5. **Normalize output** if `!err`: `json` stringify tabs; `array-of-strings` join.

6. **If err:** log, debounced snackbar **32 ms**; optional `moveCursorTo`.

7. **If success:** `output === null` + `extraInfo.stats` → no snackbar; else `output === null` → snackbar stringified extraInfo; else `onComputeOutput` or `setValue`, then `onValueUpdate`.

---

## 5.6 Debouncing

- Snackbar: **32 ms** (`useDebouncedCallback`).
- Editor `onChange` → **750 ms** debounce → `applyTheOperation` when `autoApply` && `operation`.

---

## 5.7 `useEffect([autoApply, operation])`

Runs `applyTheOperation()` when both truthy (auto-run on operation switch / autoApply).

---

## 5.8 Toolbar implementation notes

- Clipboard API with silent failure on copy.
- Undo/redo disabled polling uses `refreshUndoRedo` after debounced editor change.
- Save: HTML mode hits **`default`** branch → extension **`txt`**.

---

**Prev:** [04-search-params.md](./04-search-params.md) · **Next:** [06-state-and-recent-ops.md](./06-state-and-recent-ops.md)  
**Index:** [README.md](./README.md)
