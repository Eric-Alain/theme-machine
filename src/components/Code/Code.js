import * as React from "react"

//Components
import { RawCss } from "./Raw"

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism"

SyntaxHighlighter.registerLanguage("jsx", jsx)

const Code = () => {
  return (
    <section className="col-span-12">
      <h2>Code</h2>

      <SyntaxHighlighter language="css" style={okaidia}>
        {RawCss()}
      </SyntaxHighlighter>
    </section>
  )
}

export default Code
