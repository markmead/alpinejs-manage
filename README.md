# Alpine JS Manage

Manage another Alpine JS element 👩‍✈️

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
  Make Invisible
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
