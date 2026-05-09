# 9. Styling

---

## 9.1 CSS modules

Examples: `MainEditor.css`, `ContentTabs.css`, `Dashboard.css`, `TheEditors.css`, `SingleEditor.css`, `DoubleEditor.css`, `TripleEditor.css`, `App.css`, `PageHeader.css`, `PageFooter.css`.

---

## 9.2 Responsive helpers

[`src/App/helperStyles.css`](../../../src/App/helperStyles.css)

- `hideForContainerLT640` — hide fragment when container width &lt; 640px (tab labels, compact Apply).
- `hideForContainerGE640` — inverse for wide toolbar Apply button.

Parent elements set `containerType: 'inline-size'` where needed.

---

**Prev:** [08-text-utils-and-lazy-loading.md](./08-text-utils-and-lazy-loading.md) · **Next:** [10-server.md](./10-server.md)  
**Index:** [README.md](./README.md)
