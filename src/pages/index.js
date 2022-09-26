//React
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Starter from "../components/Starter/Starter"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div className="bg-secondary-300 py-10">
      <div className="container mx-auto py-3 px-2 bg-tertiary-100 rounded">
        <h1>Theme Machine</h1>
        <hr className="text-primary-100 mb-3"/>
        <p>Intro sentence here.</p>

        <h2>Redux Test Component</h2>
        <Starter />
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <h2>Options</h2>
          </div>

          <div className="col-span-8">
            <h2>Result</h2>
          </div>
        </div>
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
