import React, { useState, useEffect } from "react"
import ReactDOMServer from "react-dom/server"

//Redux
import { useSelector } from "react-redux"

//Components
import { RawHtml } from "../Code/Raw"

const Result = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)

  const [rawCSS, setRawCSS] = useState(`
  :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --tertiary: ${colors.tertiary};
      --font-general: ${fonts.general};
      --font-heading: ${fonts.heading};

      --blue: #1e90ff;
  }

  body {
      font-family: var(--font-general)
      background-color: var(--secondary)
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
      font-family: var(--font-heading)
      color: var(--primary);
      color: ${colors.primary};
  }`)

  useEffect(() => {
    setRawCSS(`
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
  }, [colors, fonts])

  const test = (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Results boilerplate</title>
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
        <style type="text/css">{rawCSS}</style>
      </head>
      <body>
        <main>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </main>
      </body>
    </html>
  )
  return (
    <section id="result" className="col-span-12 md:col-span-8">
      <h2>Result</h2>
      <iframe
        srcDoc={ReactDOMServer.renderToString(test)}
        title="test"
        className="rounded border border-solid border-primary-300 overflow-y-scroll min-h-[32rem] max-h-[32rem]"
      ></iframe>
    </section>
  )
}

export default Result
