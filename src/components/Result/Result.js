// React
import React, { useState, useEffect, useRef } from "react"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setCSS } from "../../state/actions/code"
import { setShape } from "../../state/actions/styles"

// Utils
import { lightOrDark, decodeHtmlEntities } from "../../utils"

const Result = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)
  const bodyHtml = useSelector(state => state.code.bodyHtml)
  const css = useSelector(state => state.code.css)
  const theme = useSelector(state => state.theme)

  const dispatch = useDispatch()

  const iframeRef = useRef(null)

  useEffect(() => {
    // Decode the css stored in redux store, as we need to complete some find/replace operations with it
    const tempCss = decodeHtmlEntities(css)

    const swapArr = [
      {
        var: `--primary: ${colors.primary};`,
        reg: /--primary: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\\n*})/gm
      },
      {
        var: `--secondary: ${colors.secondary};`,
        reg: /--secondary: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--tertiary: ${colors.tertiary};`,
        reg: /--tertiary: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--background: ${colors.background};`,
        reg: /--background: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--foreground: ${colors.foreground};`,
        reg: /--foreground: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--general-text-color: ${lightOrDark(colors.foreground)};`,
        reg: /--general-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--herobtn-text-color: ${lightOrDark(colors.tertiary)};`,
        reg: /--herobtn-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--button-text-color: ${lightOrDark(colors.secondary)};`,
        reg: /--button-text-color: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      }
    ]

    let tempString = tempCss

    swapArr.forEach(swap => {
      tempString = tempString.replace(swap.reg, swap.var)
    })

    dispatch(setCSS(tempString))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors])

  useEffect(() => {
    // Decode the css stored in redux store, as we need to complete some find/replace operations with it
    const tempCss = decodeHtmlEntities(css)

    const swapArr = [
      {
        var: `--font-general: ${fonts.general.replace(/'/gm, "")};`,
        reg: /--font-general: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      },
      {
        var: `--font-heading: ${fonts.heading.replace(/'/gm, "")};`,
        reg: /--font-heading: *(.*?)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      }
    ]

    let tempString = tempCss

    swapArr.forEach(swap => {
      tempString = tempString.replace(swap.reg, swap.var)
    })
    dispatch(setCSS(tempString))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fonts])

  useEffect(() => {
    // Decode the css stored in redux store, as we need to complete some find/replace operations with it
    const tempCss = decodeHtmlEntities(css)

    const swapArr = [
      {
        var: `--tm-radius: ${shape.radius}px;`,
        reg: /--tm-radius: *(\d+)[\s\S]*?(?=\n*\t*[--]*[a-zA-Z]*-*[a-zA-Z]*-*[a-zA-Z]*:|\n*})/gm
      }
    ]

    let tempString = tempCss

    swapArr.forEach(swap => {
      tempString = tempString.replace(swap.reg, swap.var)
    })
    dispatch(setCSS(tempString))

    // If there's a border radius value, we set the rounded state to true, otherwise false
    dispatch(setShape({ ...shape, rounded: shape.radius > 0 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape.radius])

  // Create a state reference for scroll position of iFrame
  const [scroll, setScroll] = useState(0)

  /***********************************/
  /*BEFORE UNLOAD LISTENER FOR IFRAME*/
  /***********************************/
  useEffect(() => {
    const frame = iframeRef.current

    // Handle page exit or refresh, set localStorage value for scroll position of our iFrame
    const onBeforeUnload = ev => {
      localStorage.setItem("theme-scroll-pos", frame.contentWindow.scrollY)
    }

    // Add listener onMount
    window.addEventListener("beforeunload", onBeforeUnload)

    // Remove listener onUnmount
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload)
    }
  }, [])

  /************************************/
  /*USEEFFECT HOOK FOR SCROLL POSITION*/
  /************************************/

  // Update the scroll state value any time we play around with values that re-render the component
  useEffect(() => {
    const frame = iframeRef.current
    setScroll(frame.contentWindow.scrollY)
  }, [colors, fonts, shape, css, bodyHtml, scroll])

  /***************************/
  /*ONLOAD HANDLER FOR IFRAME*/
  /***************************/

  const handleOnLoad = () => {
    const scrollPos = parseInt(localStorage.getItem("theme-scroll-pos"))

    // If we have a scroll position saved in memory and our state scroll position hasn't initialized (so, basically, on a page refresh), use the value in memory
    if (scrollPos && scroll === 0) {
      iframeRef.current.contentWindow.scrollTo(0, scrollPos)
    }
    // Otherwise, refer to the value store in state (for example, on component re-renders, but not a page refresh)
    else {
      iframeRef.current.contentWindow.scrollTo(0, scroll)
    }
  }

  const getGeneratedPageURL = ({ html, css }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type })
      return URL.createObjectURL(blob)
    }

    // Must be fonts available in google apis as well as font source, addl fonts must be installed via npm fontsource and added to gatsby-browser.js
    // Easy rule to remember, font needs to exist in Google fonts and FontSource
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

    // const cssURL = getBlobURL(css, "text/css")
    // const jsURL = getBlobURL(js, "text/javascript")
    // ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
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
          ref={iframeRef}
          key={"results-iframe"}
          src={url}
          title="Results"
          onLoad={handleOnLoad}
        />
      </div>
    </section>
  )
}

export default Result
