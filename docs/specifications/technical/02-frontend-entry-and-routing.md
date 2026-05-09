# 2. Frontend entry and routing

---

## 2.1 `src/App/AppWrapper.js`

- Wraps `RouterProvider` with `SnackbarProvider`: top-right, `maxSnack={3}`, `dense`, `preventDuplicate`, `autoHideDuration={3000}`.
- **Router:** single route `path: window.location.pathname` — SPA works under subpaths (e.g. GitHub Pages `/transformers/`). Element: `<App />`.

---

## 2.2 `src/App/App.js`

Imports `./styles-reset.css`, `App.css`. Renders `PageHeader`, `Dashboard` in `.ContentWide`, `PageFooter`, `AppDialogs`.

---

## 2.3 `src/App/AppDialogs/AppDialogs.js`

On mount: if `!('container' in document.documentElement.style)`, opens [`DialogCssContainerQueriesNotSupported`](../../../src/App/Dialogs/DialogCssContainerQueriesNotSupported.js). **Functional:** [02-workspaces.md](../functional/02-workspaces.md) §2.5.

---

**Prev:** [01-repository-and-stack.md](./01-repository-and-stack.md) · **Next:** [03-dashboard-and-workspaces.md](./03-dashboard-and-workspaces.md)  
**Index:** [README.md](./README.md)
