# Alpine JS Manage

Manage another Alpine JS elements `x-data` values 👩‍✈️

> [!NOTE]
> **This project is archived.** This plugin is a one-liner over
> [`Alpine.$data`](https://alpinejs.dev/globals/alpine-data) — `$manage(sel)` is
> `Alpine.$data(document.querySelector(sel))`, which Alpine gives you for free.
> For most cross-component state, reach for
> [`Alpine.store`](https://alpinejs.dev/globals/alpine-store) instead; it's
> built in and better suited to the job. Writing into another component's scope
> is still the pragmatic answer when you don't control the markup structure
> (server-rendered templates, for example) and can't restructure into a store.
> The 2.0.0 release was tested against Alpine 3.x before publishing, but the
> project is no longer developed.

## Breaking Changes in 2.0.0

- Targets with no Alpine component ancestor now return `undefined` instead of a
  scope. Previously `$manage('#NotAlpine').userName = 'John Cena'` threw a
  `TypeError` from inside Alpine; reads already returned `undefined`.
- The package now ships `dist/manage.mjs` and `dist/manage.cjs` (previously
  `dist/manage.esm.js`, with no CommonJS build at all, and no `main` or
  `exports` — so Node resolved neither `import` nor `require`). Both work now;
  update any deep imports of the old file paths.

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-manage@latest/dist/manage.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### With a Package Manager

```shell
pnpm add -D alpinejs-manage

yarn add -D alpinejs-manage

npm install -D alpinejs-manage
```

```js
import Alpine from 'alpinejs'
import manage from 'alpinejs-manage'

Alpine.plugin(manage)

Alpine.start()
```

## Example

```html
<button x-data x-on:click="$manage('#TargetEl').userName = 'John Cena'">
  Change Name
</button>

<div x-data="{ userName: 'Jane Doe' }" id="TargetEl">
  <span x-text="userName"></span>
</div>
```

Here we're targeting the `TargetEl` element and setting the `userName` to "John
Cena".

## Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-manage)
![](https://img.shields.io/npm/v/alpinejs-manage)
![](https://img.shields.io/npm/dt/alpinejs-manage)
![](https://img.shields.io/github/license/markmead/alpinejs-manage)
