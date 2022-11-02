export default function (Alpine) {
  Alpine.magic('manage', () => (targetEl) => {
    const foundEl = document.querySelector(targetEl)

    if (!foundEl) {
      return
    }

    return Alpine.$data(foundEl)
  })
}
