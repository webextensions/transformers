# Default selections and recommended operations

Constants live in [`constOperations.js`](../../../../src/App/Dashboard/MainEditor/constOperations.js).

---

## Per-mode default `operationId`

Used when initializing `selectedOperations` / sanitizing invalid URLs:

| Mode | Default |
|------|---------|
| `css` | `cssFormat` |
| `csv` | `csvToJson` |
| `html` | `htmlFormat` |
| `json` | `jsonFormat` |
| `less` | `lessFormat` |
| `text` | `textSort` |

---

## `defaultRecommendedOperations` (recent-ops seed)

When recent operations cannot be loaded from storage or need resetting:

`cssFormat`, `csvToJson`, `htmlFormat`, `jsonFormat`, `lessFormat`, `textSort`

See also [06-state-and-recent-ops.md](../../technical/06-state-and-recent-ops.md).

---

**Up:** [README.md](./README.md) · **Index:** [../README.md](../README.md)
