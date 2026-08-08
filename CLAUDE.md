# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

**Archived as of 2.0.0 (August 2026.)** The plugin is a one-liner over
`Alpine.$data`, and `Alpine.store` covers the cross-component-state use case it
was written for. The package stays installable on npm — it is not
`npm deprecate`d — but no further development is planned. Match the archival
framing in `README.md` before adding anything here.

## Commands

```shell
pnpm install    # esbuild is the only dependency
pnpm build      # bundles + minifies builds/*.js into dist/
```

pnpm is pinned via `packageManager` in `package.json`. `pnpm-workspace.yaml`
sets `minimumReleaseAge` (48h supply-chain cooldown) and allowlists esbuild's
postinstall, which pnpm blocks by default.

There is no test suite, linter, or dev server. Verification is manual: create an
`index.html` at the repo root (it is gitignored for this purpose), serve the
repo (`python3 -m http.server`), and load `dist/manage.min.js` plus Alpine from
a CDN. Note that Alpine flushes reactive effects on the next tick, so assert
DOM changes after `await Alpine.nextTick()`, not synchronously after a write.

## Architecture

An Alpine.js plugin published to npm/unpkg as `alpinejs-manage`. It registers a
single magic, `$manage`, which takes a CSS selector and returns that element's
reactive `x-data` scope via `Alpine.$data`, letting one component write to
another's state. Returns `undefined` when the selector matches nothing **or**
when the match has no Alpine component ancestor — in the latter case
`Alpine.$data` hands back an empty data stack whose writes throw from inside
Alpine, so the `Alpine.closestRoot` guard is load-bearing, not defensive
padding.

The whole plugin is `src/index.js` — a handful of lines. Everything else is
packaging:

- `builds/cdn.js` — browser entry; self-registers on `alpine:init` against
  `window.Alpine`.
- `builds/module.js` — bundler entry; re-exports the plugin for
  `Alpine.plugin(manage)`.
- `scripts/build.js` — esbuild config producing `dist/manage.min.js` (cdn),
  `dist/manage.mjs` (esm) and `dist/manage.cjs` (cjs).

Extensions are explicit because `package.json` has no `type` field. The CJS
build appends `module.exports = module.exports.default` so
`Alpine.plugin(require('alpinejs-manage'))` gets the function rather than a
module namespace object. `exports`/`main`/`module` must stay in sync with those
filenames — 1.0.4 shipped only `module`, so Node resolved neither `import` nor
`require`.

`dist/` is committed to git, not just published. Run `pnpm build` and commit the
output alongside any change to `src/` or `builds/`, or the CDN build will drift
from source. `files` limits the npm tarball to `dist/`.

Alpine itself is never a dependency — the plugin relies on the `Alpine` instance
handed to it, and the CDN build on the global. Keep it that way.
