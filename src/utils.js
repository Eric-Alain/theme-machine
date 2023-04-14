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

export const lightOrDark = hexcolor => {
  var r = parseInt(hexcolor.substring(1, 3), 16)
  var g = parseInt(hexcolor.substring(3, 5), 16)
  var b = parseInt(hexcolor.substring(5, 7), 16)
  var yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#FFFFFF"
}

export const htmlEntities = str =>
  String(str)
    .replace(/&/gm, "&amp;")
    .replace(/</gm, "&lt;")
    .replace(/>/gm, "&gt;")
    .replace(/"/gm, "&quot;")
    .replace(/\n/gm, "\\n")
    .replace(/\t/gm, "\\t")

export const decodeHtmlEntities = str =>
  String(str)
    .replace(/&amp;/gm, "&")
    .replace(/&lt;/gm, "<")
    .replace(/&gt;/gm, ">")
    .replace(/&quot;/gm, '"')
    .replace(/\\n/gm, "\n")
    .replace(/\\t/gm, "\t")

export const randomStringFromArray = (string, array) => {
  let tempStr = string

  const getString = () => {
    tempStr = array[Math.floor(Math.random() * array.length)]
  }

  while (tempStr === string) {
    getString()
  }

  return tempStr
}

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
