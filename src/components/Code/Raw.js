//Redux
import { useSelector } from "react-redux"
import * as React from "react"

export const RawCss = () => {
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)

  return `
    :root {
        --primary: ${colors.primary};
        --secondary: ${colors.secondary};
        --tertiary: ${colors.tertiary};
        --font-general: ${fonts.general};
        --font-heading: ${fonts.heading};
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
    }`
}

export const RawHtml = ({ body }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Results boilerplate</title>
        <style>${RawCss()}</style>
      </head>
      {body}
    </html>
  )
}
