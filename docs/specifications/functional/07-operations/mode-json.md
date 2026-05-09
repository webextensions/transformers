# Mode `json` (JSON)

---

## Operations

| operationId | Label | Meaning |
|-------------|-------|---------|
| `jsonFormat` | Format | Pretty-print JSON. |
| `jsonMinify` | Minify | Minified JSON. |
| `jsonSort` | Sort JSON | **Stable canonical layout:** `json-stable-stringify` with sorted keys + tabs—not reordering array elements semantically. |
| `jsonRemoveProperty` | Remove property | `prompt()` name; recursive delete (see source for array edge cases). |
| `jsonArrayReverse` | Reverse | Root must be **array**; reverses in place; else error. |
| `jsonArrayOfObjectsFlattenObjects` | Flatten objects | Root **array**; dot-path keys for nested plain objects. |
| `jsonArrayOfObjectsSortByProperty` | Sort by property | `prompt()` property; sorts root with `<`/`>` on property values. |
| `jsonFixDataTypes` | Fix data types | Recursive string→bool/number/null coercion. |
| `jsonToCsv` | JSON to CSV | Async `json-2-csv`. |
| `jsonToLines` | JSON to lines | Root must be **array of strings**; else error; no `operationOutputType` (plain string join). |

---

**Up:** [README.md](./README.md) · **Index:** [../README.md](../README.md)
