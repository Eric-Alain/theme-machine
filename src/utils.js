export const megaTrim = (str = "") =>
  str
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\t+/gm, " ")
    .replace(/\ +/gm, " ")
    .trim()

export const camelCase = str =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "")

export const debounce = (delay, callbacks) => {
  /*Kill any existing timeouts */
  let id = window.setTimeout(() => {}, delay)
  while (id--) {
    window.clearTimeout(id)
  }
  //Call desired function after timeout
  const dispatchCall = setTimeout(() => {
    callbacks.forEach(callback => {
      callback()
    })
  }, delay)
  return () => clearTimeout(dispatchCall)
}


