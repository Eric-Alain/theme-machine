import React, { useEffect } from "react"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setCSS } from "../../state/actions/code"

//Utils
import { lightOrDark } from "../../utils"

const Result = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)
  const bodyHtml = useSelector(state => state.code.bodyHtml)
  const css = useSelector(state => state.code.css)

  const dispatch = useDispatch()

  useEffect(() => {
    /*console.log(
      useSelector(state => state.styles.colors.primary)
    )*/
    //Complex, update only specific parts of css redux state whenever colors or fonts state changes, keeps everything in sync
    //General idea:
    // -make object of redux selectors used to update state
    // -make array of regex patterns and corresponding replacements
    // -save to local variable
    // -dispatch update to redux using local variable

    const cssVars = {
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.tertiary,
      fontGeneral: fonts.general.replace(/'/gm, ""),
      fontHeading: fonts.heading.replace(/'/gm, ""),
      rounded: shape.rounded,
      radius: shape.radius
    }

    const swapArr = [
      {
        var: `--primary: ${cssVars.primary};`,
        reg: /--primary: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--secondary: ${cssVars.secondary};`,
        reg: /--secondary: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--tertiary: ${cssVars.tertiary};`,
        reg: /--tertiary: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--general-text-color: ${lightOrDark(cssVars.tertiary)};`,
        reg: /--general-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--button-text-color: ${lightOrDark(cssVars.secondary)};`,
        reg: /--button-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--font-general: ${cssVars.fontGeneral};`,
        reg: /--font-general: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--font-heading: ${cssVars.fontHeading};`,
        reg: /--font-heading: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--tm-radius: ${cssVars.rounded ? cssVars.radius : 0}px;`,
        reg: /--tm-radius: *(\d+)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      }
    ]

    let tempString = css

    swapArr.forEach(swap => {
      tempString = tempString.replace(swap.reg, swap.var)
    })
    dispatch(setCSS(tempString))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, fonts, shape])

  const getGeneratedPageURL = ({ html, css }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }

    //const cssURL = getBlobURL(css, "text/css")
    //const jsURL = getBlobURL(js, "text/javascript")
    //${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
    const source = `
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Damion"
          />		 
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Fira+Mono"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Jost"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Mouse+Memoirs"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Nova+Cut"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Rubik+Dirt"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Ubuntu"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Urbanist"
          />
		<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Viga"
          />
          <style>${css}</style>
        </head>
        <body>
          ${html || ""}
        </body>
      </html>
    `
    return getBlobURL(source, "text/html")
  }

  const url = getGeneratedPageURL({
    html: bodyHtml,
    css: css
  })

  return (
    <section id="result" className="col-span-12 md:col-span-8">
      <h2>Result</h2>
      <iframe
        key={"results-iframe"}
        src={url}
        title="Results"
        className="rounded border border-solid border-primary-300 overflow-y-scroll min-h-[40rem] max-h-[40rem]"
      />
    </section>
  )
}

export default Result
