# Mode `csv` (CSV)

**Naïve** CSV: comma split per line—**not** RFC-aware for quoted commas.

---

## Operations

| operationId | Label | Meaning |
|-------------|-------|---------|
| `csvRemoveFirstColumn` | Remove first column from CSV | Split on `,`, drop first cell, rejoin. |
| `csvRemoveLastColumn` | Remove last column from CSV | Drop last cell, rejoin. |
| `csvToJson` | CSV to JSON | `csv2json` / helpers in [textUtils](../../../../src/App/Dashboard/MainEditor/textUtils.js). |

---

**Up:** [README.md](./README.md) · **Index:** [../README.md](../README.md)
