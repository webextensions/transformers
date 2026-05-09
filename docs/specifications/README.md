# Transformers — specifications

Implementation-aligned specifications for this repository (**version 0.6.7** per `package.json`). They describe behavior as built, not a separate roadmap.

**Flat list of every page:** [INDEX.md](./INDEX.md)

## Navigation

| Area | Index | Description |
|------|--------|-------------|
| **Functional** (what users experience) | [**functional/README.md**](./functional/README.md) | Product scope, workspaces, URL/storage, editor UX, apply pipeline, operations by mode. |
| **Technical** (how it is built) | [**technical/README.md**](./technical/README.md) | Repository map, stack, components, `MainEditor`, state, server, webpack, quality gates. |

Start from either index; cross-links between functional and technical chapters are provided throughout.

## Folder tree

```text
docs/specifications/
├── README.md                 ← you are here
├── functional/
│   ├── README.md             ← functional index
│   ├── 01-overview.md
│   ├── 02-workspaces.md
│   ├── 03-url-and-storage.md
│   ├── 04-layout-and-chrome.md
│   ├── 05-main-editor-ux.md
│   ├── 06-apply-pipeline.md
│   ├── 07-operations/
│   │   ├── README.md
│   │   ├── defaults.md
│   │   ├── mode-text.md
│   │   ├── mode-json.md
│   │   ├── mode-csv.md
│   │   ├── mode-css.md
│   │   ├── mode-html.md
│   │   └── mode-less.md
│   ├── 08-non-functional.md
│   └── 09-acceptance-criteria.md
└── technical/
    ├── README.md             ← technical index
    ├── 01-repository-and-stack.md
    ├── 02-frontend-entry-and-routing.md
    ├── 03-dashboard-and-workspaces.md
    ├── 04-search-params.md
    ├── 05-main-editor.md
    ├── 06-state-and-recent-ops.md
    ├── 07-mode-registry-and-schema.md
    ├── 08-text-utils-and-lazy-loading.md
    ├── 09-styling.md
    ├── 10-server.md
    ├── 11-webpack-and-configuration.md
    └── 12-quality-todos-and-checklist.md
```

## Suggested reading order

1. [functional/README.md](./functional/README.md) — behavior and operation meanings.
2. [technical/README.md](./technical/README.md) — files, contracts, and build/server.

Together these modules are intended to be sufficient for a capable engineer or AI system to **reproduce the application’s behavior**, modulo third-party bugs and exact styling.
