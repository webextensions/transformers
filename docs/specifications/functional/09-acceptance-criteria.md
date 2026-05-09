# 9. Acceptance criteria (regression-oriented)

A faithful re-implementation should:

1. Provide three workspaces per [02-workspaces.md](./02-workspaces.md) and URL behavior per [03-url-and-storage.md](./03-url-and-storage.md).
2. Preserve `localStorage` keys and semantics in [03-url-and-storage.md](./03-url-and-storage.md).
3. Implement every `operationId` under [07-operations](./07-operations/README.md) with observable equivalence (golden tests recommended).
4. Match special cases: empty input, JSON parse errors, stats `alert`, `jsonToLines` input restriction—[06-apply-pipeline.md](./06-apply-pipeline.md).
5. Triple-editor combinators: `split('\n')` / `join('\n')` + Lodash `union` / `intersection` / `difference` / append—[02-workspaces.md](./02-workspaces.md).
6. Double-editor: `onComputeOutput` to right buffer; optional debounced auto-apply—[02-workspaces.md](./02-workspaces.md), [05-main-editor.md](../technical/05-main-editor.md).

---

**Prev:** [08-non-functional.md](./08-non-functional.md)  
**Index:** [README.md](./README.md) · [Specifications home](../README.md)
