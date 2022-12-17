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
    dispatch(
      setCSS(`
  :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --tertiary: ${colors.tertiary};
      --font-general: ${fonts.general.replace(/'/gm, "")};
      --font-heading: ${fonts.heading.replace(/'/gm, "")};
  }

  body {
    font-family: var(--font-general);
    background-color: var(--secondary);
  }

  main {
    margin: 3rem;
    padding: 0.25rem 1.5rem;
    background-color: var(--tertiary)
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
      font-family: var(--font-heading);
      color: var(--primary);
  }
    `)
    )
  }, [colors, fonts, dispatch])

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
