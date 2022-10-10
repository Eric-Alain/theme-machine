export const megaTrim = (str = "") =>
  str
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\t+/gm, " ")
    .replace(/\ +/gm, " ")
    .trim()

export const camelCase = str =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
