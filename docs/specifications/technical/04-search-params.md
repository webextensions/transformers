# 4. Search params helper

**Source:** [`src/App/Dashboard/utils/getCurrentSearchParamsAsJson.js`](../../../src/App/Dashboard/utils/getCurrentSearchParamsAsJson.js)

```javascript
const params = new URLSearchParams(window.location.search);
const ob = {};
for (const param of params) {
    ob[param[0]] = param[1];
}
return ob;
```

Duplicate keys: **first wins** (iteration order).

Used when merging URL updates from tabs (`ContentTabs`) and from `MainEditor` (`generateTargetSearchParamsAsJson`). See [05-main-editor.md](./05-main-editor.md).

**Functional:** [03-url-and-storage.md](../functional/03-url-and-storage.md)

---

**Prev:** [03-dashboard-and-workspaces.md](./03-dashboard-and-workspaces.md) · **Next:** [05-main-editor.md](./05-main-editor.md)  
**Index:** [README.md](./README.md)
