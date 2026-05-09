# 6. Apply pipeline (functional contract)

Wire-up in `MainEditor`: [05-main-editor.md](../technical/05-main-editor.md). Operation configs: [07-mode-registry-and-schema.md](../technical/07-mode-registry-and-schema.md).

---

## 6.1 Input shapes (from buffer)

| `operationInputType` | Parameters |
|----------------------|------------|
| `text` | `inputText` — raw string. |
| `json` | `inputJson` — `JSON.parse` of entire buffer (parse errors → user-facing error). |
| `array-of-strings` | `inputArrayOfStrings` — `inputValue.split('\n')`. |

---

## 6.2 Output shapes (after `performOperation`)

| `operationOutputType` | Post-processing |
|----------------------|-----------------|
| `json` | `JSON.stringify(output, null, '\t')`. |
| `array-of-strings` | `Array.isArray` → `join('\n')`. |
| `text` or **omitted** | String used as-is (e.g. `jsonToLines`). |

---

## 6.3 Errors and feedback

- **Errors:** Toast (snackbar) with `err.message`; optional **cursor move** if operation returns `extraInfo.moveCursorTo`. See technical `applyTheOperation`.
- **Empty input:** Output `''`; still calls `onComputeOutput` / sets value / `onValueUpdate` as applicable.

---

## 6.4 Special cases

- **`output === null`** with **`extraInfo.stats`:** No error toast (e.g. **Get stats** uses browser **alert** for counts). See [mode-text.md](./07-operations/mode-text.md).
- **`output === null`** without stats: `extraInfo` may be shown as error snackbar (stringified).
- **`window.prompt`:** Used where operations need extra arguments (strip N chars, JSON property name, etc.).

---

**Prev:** [05-main-editor-ux.md](./05-main-editor-ux.md) · **Next:** [07-operations/README.md](./07-operations/README.md)  
**Index:** [README.md](./README.md)
