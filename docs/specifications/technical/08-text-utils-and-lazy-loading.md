# 8. Shared utilities and lazy loading

---

## 8.1 `textUtils.js`

[`src/App/Dashboard/MainEditor/textUtils.js`](../../../src/App/Dashboard/MainEditor/textUtils.js)

**Lines:** `removeEmptyLines` (`filter(Boolean)`), `removeDuplicates` (`new Set`), `removeUniques` (counts > 1), trim helpers, comma-at-EOL, strip quotes.

**CSV (naïve):** `removeFirstColumnFromCsvLines`, `removeLastColumnFromCsvLines` — `split(',')`, slice, `join`.

**Conversion:** `json2csv` / `csv2json` (`json-2-csv`), `fixDataTypes`, `jsonStableStringify` export.

---

## 8.2 `lazyLoadLibraries.js`

[`src/utils/lazyLoadLibraries/lazyLoadLibraries.js`](../../../src/utils/lazyLoadLibraries/lazyLoadLibraries.js)

- LESS, `helpmate-css` beautify/minify, combined beautify+LESS, `cssToScss`
- **Prettier** + HTML plugin (`lazyLoadPrettierAndParserHtml`)
- Lodash **`difference`**, **`intersection`**, **`union`** (per-method dynamic imports)
- **`before-loading-less.js`** side effect before LESS imports

---

## 8.3 Ace lazy component

[`lazyLoadAceEditorComponent.js`](../../../src/utils/lazyLoadComponents/lazyLoadAceEditorComponent.js) — dynamic import for bundle splitting.

**MainEditor** uses `React.lazy` + `<Suspense fallback={<Loading type="line-scale" />}>`.

---

**Prev:** [07-mode-registry-and-schema.md](./07-mode-registry-and-schema.md) · **Next:** [09-styling.md](./09-styling.md)  
**Index:** [README.md](./README.md)
