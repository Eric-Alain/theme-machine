import React, { useState, useEffect } from "react"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setCSS } from "../../state/actions/code"

const Result = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const bodyHtml = useSelector(state => state.code.bodyHtml)
  const css = useSelector(state => state.code.css)

  const dispatch = useDispatch()

  useEffect(() => {
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
      fontHeading: fonts.heading.replace(/'/gm, "")
    }

    const swapArr = [
      { var: `--primary: ${cssVars.primary};`, reg: /--primary: *(.*?);/gm },
      {
        var: `--secondary: ${cssVars.secondary};`,
        reg: /--secondary: *(.*?);/gm
      },
      { var: `--tertiary: ${cssVars.tertiary};`, reg: /--tertiary: *(.*?);/gm },
      {
        var: `--font-general: ${cssVars.fontGeneral};`,
        reg: /--font-general: *(.*?);/gm
      },
      {
        var: `--font-heading: ${cssVars.fontHeading};`,
        reg: /--font-heading: *(.*?);/gm
      }
    ]

    let tempString = css;

    swapArr.forEach(swap => {
      tempString = tempString.replace(swap.reg, swap.var)
    })

    dispatch(
      setCSS(tempString)
    )
  }, [colors, fonts, dispatch, css])

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
            href="https://fonts.googleapis.com/css?family=Jost"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Fira+Mono"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Damion"
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
        className="rounded border border-solid border-primary-300 overflow-y-scroll min-h-[32rem] max-h-[32rem]"
      />
    </section>
  )
}

export default Result
