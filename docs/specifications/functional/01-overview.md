# 1. Purpose and scope (functional)

**Version:** 0.6.7 ([`package.json`](../../../package.json))

---

## 1.1 Product summary

**Transformers** is a single-page web application for applying deterministic **text transformations** to content typed or loaded into one or more editors. Users choose a **mode** (content family), then an **operation** within that mode, and apply it to produce new text—often JSON formatting, line-oriented list operations, CSV conversions, CSS/HTML/LESS formatting, and similar utilities.

The application prioritizes **local, in-browser processing**: transformations run in the client (no server-side transformation API). The optional Node server exists to **serve static assets** during development and production-style testing. See [10-server.md](../technical/10-server.md).

---

## 1.2 Out of scope (as implemented)

- User accounts, authentication in the client, or cloud sync (the Express app has placeholder `/admin` and `/user-account` routes only). See [10-server.md](../technical/10-server.md).
- Perfect CSV or RFC-4186 parsing; CSV column operations are **line-based comma splits** and do not fully handle quoted fields. See [mode-csv.md](./07-operations/mode-csv.md).
- Guaranteed undo across full buffer replace after some operations; Ace’s undo stack applies, but “apply” replaces the whole document.

---

## 1.3 Terminology

| Term | Meaning |
|------|--------|
| **Workspace** | One of three high-level layouts: **Transformers I** (single editor), **II** (input + output), **III** (two lists A/B plus result C). |
| **Mode** | A content family: `text`, `json`, `csv`, `css`, `html`, or `less`. Drives available operations, default samples, and save-as file extension (where applicable). |
| **Operation** | A named transform (e.g. `jsonFormat`, `textSort`) valid for the current mode. |
| **Apply** | Run the selected operation on the current editor body and replace content (or route output to another editor in workspace II). |

---

**Next:** [02-workspaces.md](./02-workspaces.md)  
**Index:** [README.md](./README.md)  
**Technical stack:** [01-repository-and-stack.md](../technical/01-repository-and-stack.md)
