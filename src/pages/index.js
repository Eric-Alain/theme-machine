//React
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Options from "../components/Options/Options"
import Result from "../components/Result/Result"
import Code from "../components/Code/Code"

const IndexPage = () => (
	
  <Layout>
    <Seo title="Home" />
    <div className="container mx-auto pt-1 pb-5 px-5 bg-tertiary-100 rounded">
      <h1>Theme Machine</h1>
      <p>
        A sandbox to play around with colors, fonts and sizing to quickly mock
        the CSS of your next project <strong>before</strong> writing any code.
        Spend less time writing and more time on what matters.
      </p>
      <hr className="text-primary-100 mb-3" />

      <div className="grid gap-3 grid-cols-12">
        <Options />
        <Result />
        <Code />
      </div>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
