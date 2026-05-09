# Mode `text` (Text)

---

## Operations

| operationId | Label | Meaning |
|-------------|-------|---------|
| `textRemoveEmptyLines` | Remove empty lines | `filter(Boolean)` on split lines—removes empty string lines. |
| `textRemoveDuplicates` | Remove duplicates | Dedupes exact line strings; first occurrence wins (`Set` on array). |
| `textRemoveUniques` | Remove uniques | Only lines with count **> 1**; see [textUtils](../../../../src/App/Dashboard/MainEditor/textUtils.js). |
| `textSort` | Sort | Lexicographic line sort. |
| `textSortCaseInsensitive` | Case-insensitive sort | |
| `textSortNatural` | Natural sort | |
| `textRandomize` | Randomize | |
| `textSortByLength` | Sort by length | |
| `textReverse` | Reverse | Reverses line order. |
| `textTrim` | Trim lines | `trim()` per line. |
| `textTrimLeft` | Trim lines from left | `trimStart` per line. |
| `textTrimRight` | Trim lines from right | `trimEnd` per line. |
| `textRemoveFirstFewCharacters` | Remove first few characters | `prompt()` for N; per line. |
| `textRemoveLastFewCharacters` | Remove last few characters | `prompt()` for N; per line. |
| `textRemoveCommaCharacterAtLineEnds` | Remove comma at line ends | Trailing `,` per line. |
| `textRemoveQuoteAndApostropheCharacters` | Remove `"` and `'` | Per line. |
| `textGetStats` | Get stats | `alert(JSON.stringify(stats))`; returns `[null, null, { stats }]`—no buffer change. |
| `unicodeToPunycode` | Unicode to Punycode | Per line, `punycode/` `toASCII`. |
| `punycodeToUnicode` | Punycode to Unicode | Per line, `toUnicode`. |
| `linesToJsonArray` | Lines to JSON Array | `split('\n')` → array; output `json` type (pretty tabified). |

---

**Up:** [README.md](./README.md) · **Index:** [../README.md](../README.md)  
**Technical:** [08-text-utils-and-lazy-loading.md](../../technical/08-text-utils-and-lazy-loading.md)
