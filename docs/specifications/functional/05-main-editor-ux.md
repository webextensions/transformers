# 5. Main editor (user-facing behavior)

Each **MainEditor** is the editor + operation chrome unit. Full implementation: [05-main-editor.md](../technical/05-main-editor.md).

---

## 5.1 Top row (when operations not hidden)

- **Mode** `<select>`: switches mode; updates persistence and URL.
- **Syntax highlighting** (icon): **Disabled** for modes without highlighting (**Text**, **CSV**). When on, Ace uses highlighter for JSON/CSS/HTML/LESS; when off, plain `text` mode.
- **Operation** `<select>`: grouped by `optgroup`. First option is “**-- Operations --**” (empty value)—**Apply** is disabled if no operation selected. Invalid selection shows orange dashed border (when operation id is `''`).
- **Sample** (flask): Inserts **operation** snippet if present, else **mode** snippet, else generic placeholder.
- **Apply:** Runs pipeline; in workspace II left editor, **debounced auto-apply** may run on edit when enabled.

When **`hideOperations`** (output-only editors): operation row and recent-ops strip hidden or visually suppressed; mode row may remain for syntax/wrap.

---

## 5.2 Recent operations strip

- Icon buttons for recent **`operationId`s** that exist for the **current** mode (filtered).
- Order is **global** recent order (not per-mode).
- **Star:** resets suggested operations; persistence interaction detailed in [06-state-and-recent-ops.md](../technical/06-state-and-recent-ops.md).

---

## 5.3 Editor body

- Ace, **GitHub** theme, ~`minHeight: 65vh` or parent `editorHeight` (e.g. `300px` in II/III).
- Default **placeholder:** “Provide &lt;Mode&gt; here” from readable map unless overridden.

---

## 5.4 Bottom toolbar

| Control | Behavior |
|---------|----------|
| **Load file** | If `allowFileInput`: pick file, read **UTF-8** via `file.text()`, replace buffer; input reset for re-select. |
| **Cut / Copy** | No selection → select all; clipboard API; cut uses Ace after copy. |
| **Clear** | Selection → delete selection; else clear all. |
| **Undo / Redo** | Ace undo manager; disabled state updates after debounced change. |
| **Wrap** | Toggles persisted line wrap. |
| **Save** | Download `output-<local timestamp>.<ext>`; `css`/`csv`/`json`/`less` get matching ext; **HTML uses `.txt` in the default `switch` branch** (as implemented). |

---

**Prev:** [04-layout-and-chrome.md](./04-layout-and-chrome.md) · **Next:** [06-apply-pipeline.md](./06-apply-pipeline.md)  
**Index:** [README.md](./README.md)  
**Technical:** [05-main-editor.md](../technical/05-main-editor.md)
