import * as React from "react"

//Redux
import { useSelector } from "react-redux"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("jsx", jsx)

const Code = () => {
  const colors = useSelector(state => state.styles.colors)

  return (
    <section className="col-span-12">
      <h2>Code</h2>
      <SyntaxHighlighter language="css" style={okaidia}>
        {`
:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --tertiary: ${colors.tertiary};
}

h1,
h2,
h3,
h4,
h5,
h6 {
    color: var(--primary);
}
        `}
      </SyntaxHighlighter>
    </section>
  )
}

export default Code
