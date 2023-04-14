// React
import React, { useEffect } from "react"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setCSS } from "../../state/actions/code"

//Utils
import { lightOrDark, decodeHtmlEntities } from "../../utils"

const Result = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)
  const bodyHtml = useSelector(state => state.code.bodyHtml)
  const css = useSelector(state => state.code.css)
  const theme = useSelector(state => state.theme)

  const dispatch = useDispatch()

  useEffect(() => {
    //Decode the css stored in redux store, as we need to complete some find/replace operations with it
    const tempCss = decodeHtmlEntities(css)

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
      background: colors.background,
      foreground: colors.foreground,
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
        var: `--background: ${cssVars.background};`,
        reg: /--background: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--foreground: ${cssVars.foreground};`,
        reg: /--foreground: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--general-text-color: ${lightOrDark(cssVars.foreground)};`,
        reg: /--general-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--herobtn-text-color: ${lightOrDark(cssVars.primary)};`,
        reg: /--herobtn-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
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

    let tempString = tempCss

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

    //Must be fonts available in google apis as well as font source, addl fonts must be installed via npm fontsource and added to gatsby-browser.js
    //Easy rule to remember, font needs to exist in Google fonts and FontSource
    const fonts = [
      "Damion",
      "Fira+Mono",
      "Jost",
      "Mouse+Memoirs",
      "Nova+Cut",
      "Roboto",
      "Rubik+Dirt",
      "Ubuntu",
      "Urbanist",
      "Viga"
    ]

    //const cssURL = getBlobURL(css, "text/css")
    //const jsURL = getBlobURL(js, "text/javascript")
    //${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
    const source = `
      <html class="${theme === "dark" ? "dark" : "light"}">
        <head>
	   	<meta name="viewport" content="width=device-width, initial-scale=1">
          ${fonts
            .map(font => {
              return `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${font}" />`
            })
            .join("\n")}
          <style>
			body {
				overflow-y: clip;
			}

			html {
				--scrollbarBG: #d4d4d4;
				--thumbBG: #5b6477;
				overflow-y: scroll;
			}

			html.dark {
				--scrollbarBG: #525252;
				--thumbBG: #d4d4d4;
			}

			body::-webkit-scrollbar,
			.scrollbar::-webkit-scrollbar {
				width: 11px;
			}

			body,
			.scrollbar {
				scrollbar-width: thin;
				scrollbar-color: var(--thumbBG) var(--scrollbarBG);
			}

			body,
			.scrollbar {
				scrollbar-color: var(--thumbBG) var(--scrollbarBG);
			}

			body::-webkit-scrollbar-track,
			.scrollbar::-webkit-scrollbar-track {
				background: var(--scrollbarBG);
			}

			body::-webkit-scrollbar-thumb,
			.scrollbar::-webkit-scrollbar-thumb {
				background-color: var(--thumbBG);
				border-radius: 6px;
				border: 3px solid var(--scrollbarBG);
			}
			${css}
		</style>
        </head>
        <body>${decodeHtmlEntities(html) || ""}</body>
      </html>
    `
    return getBlobURL(source, "text/html")
  }

  const url = getGeneratedPageURL({
    html: bodyHtml,
    css: css
  })

  return (
    <section id="result" className="col-span-12 lg:col-span-9 flex flex-col">
      <h2 className="dark:text-tertiary-100">Result</h2>
      <div className="rounded border border-solid border-primary-300 min-h-[40rem] h-full">
        <iframe
          key={"results-iframe"}
          src={url}
          title="Results"
         />
      </div>
    </section>
  )
}

export default Result
