export default function (Alpine) {
  Alpine.magic('manage', () => (targetEl) => {
    const foundEl = document.querySelector(targetEl)

    if (!foundEl) {
      return
    }

    // Without an Alpine component ancestor the scope is an empty data stack:
    // reads come back undefined, but writes throw from inside Alpine.
    if (!Alpine.closestRoot(foundEl)) {
      return
    }

    return Alpine.$data(foundEl)
  })
}
