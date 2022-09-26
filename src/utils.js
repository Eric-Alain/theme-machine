export const megaTrim = (str = "") => {
  return str
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(/\t+/gm, " ")
    .replace(/\ +/gm, " ")
    .trim()
}
