# 11. Webpack and configuration

---

## 11.1 Webpack CLI (`webpack.config.js`)

- **Requires** `--env.config "<path>"` to a Node module exporting a **`webpack`** object ([`webpack.config.js`](../../../webpack.config.js)).
- Generator: [`webpack/webpack-config-generator.js`](../../../webpack/webpack-config-generator.js).
- Entry: [`src/index.js`](../../../src/index.js).
- Output under `publicDirectory` from config, or `DISTDIR/transformers` when publish (`get-distribution-dirname.js`).
- Babel: `@babel/preset-react` for `.js`.
- Plugins: `MiniCssExtractPlugin`, `CopyWebpackPlugin`, `TemplateToHtmlPlugin`, completion notifier.

**Publish:** `npm run build:publish` sets `DISTDIR=publish`, production build.

---

## 11.2 Configuration layering (`config/`)

Merged with **`extend`** deep merges:

- [`config.common.js`](../../../config/config.common.js)
- [`config.development.js`](../../../config/config.development.js)
- [`config.development.local.js`](../../../config/config.development.local.js) — typical local overlay (`public-development-local`, HTTP 8000)

Production variants referenced from npm scripts.

Same config modules supply **`server`** section (Express) and **`webpack`** section (generator).

---

**Prev:** [10-server.md](./10-server.md) · **Next:** [12-quality-todos-and-checklist.md](./12-quality-todos-and-checklist.md)  
**Index:** [README.md](./README.md)
