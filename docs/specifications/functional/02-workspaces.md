# 2. Primary user journeys (workspaces)

---

## 2.1 Transformers I — single buffer

- One **Main** panel titled “**Input / Output**”. Source: [`SingleEditor.js`](../../../src/App/Dashboard/SingleEditor/SingleEditor.js).
- The same buffer is both the source and the destination: **Apply** replaces the entire editor text with the operation result (this workspace does not use `onComputeOutput`).
- User can load a file, use the sample snippet, pick mode/operation, and apply. Optional line wrap, syntax highlighting (where supported), cut/copy/clear, undo/redo, and download-to-file are on the bottom toolbar. See [05-main-editor-ux.md](./05-main-editor-ux.md).

---

## 2.2 Transformers II — input and output

- **Left:** “**Input**” — full `MainEditor` with mode/operation controls, file load, **Auto-apply** checkbox (default **on**), and apply actions. See [`DoubleEditor.js`](../../../src/App/Dashboard/DoubleEditor/DoubleEditor.js).
- **Right:** “**Output**” — second `MainEditor` with **no** mode/operation row (`hideOperations`). Shows the **result** of the last successful apply from the left via `onComputeOutput` → right `setValue`.
- **Auto-apply:** When enabled, a **debounced** apply runs after the user edits the input so output tracks typing; when disabled, user must Apply explicitly. Timing: [05-main-editor.md](../technical/05-main-editor.md).
- **Swap:** Exchanges the **entire text** of left and right editors (buffer only; mode/operation stays on the left).

---

## 2.3 Transformers III — two inputs and line-set combinators

- **A** and **B:** Independent editors (`allowFileInput`). Standard operation chrome unless constrained by parent—here both show operations.
- **C:** Result editor **without** operation controls (`hideOperations`); combined output only.

**Swap (A ↔ B):** Full text swap only.

**Combinator buttons:**

| Concept | Behavior |
|---------|----------|
| **A ∪ B** | Lines from A and B (`split('\n')`); **union** via Lodash `union` (first-seen order, deduped). |
| **A ∩ B** | **Intersection** (`intersection`). |
| **A + B** | **Append:** `[...linesA, ...linesB]` then `join('\n')`. |
| **A − B** | **Difference:** lines in A not in B (`difference`). |

Implement split/join consistently with JavaScript `String.prototype.split('\n')` / `join('\n')`.

Source: [`TripleEditor.js`](../../../src/App/Dashboard/TripleEditor/TripleEditor.js); lazy Lodash: [08-text-utils-and-lazy-loading.md](../technical/08-text-utils-and-lazy-loading.md).

---

## 2.4 First-time and returning users

- **URL query parameters** deep-link workspace (`transformers=1|2|3`), **mode**, and **operation**. See [03-url-and-storage.md](./03-url-and-storage.md).
- **localStorage** persists workspace, per-mode operation, preferences. Same chapter.

---

## 2.5 Browser capability notice

On load, if **CSS container queries** are not supported (`'container' in document.documentElement.style`), a **dialog** warns layout may degrade; user can dismiss. Source: [`AppDialogs.js`](../../../src/App/AppDialogs/AppDialogs.js).

---

**Prev:** [01-overview.md](./01-overview.md) · **Next:** [03-url-and-storage.md](./03-url-and-storage.md)  
**Index:** [README.md](./README.md)  
**Technical:** [03-dashboard-and-workspaces.md](../technical/03-dashboard-and-workspaces.md)
