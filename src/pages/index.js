//React
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Starter from "../components/Starter/Starter"
import Options from "../components/Options/Options"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div className="container mx-auto pt-1 pb-5 px-5 bg-tertiary-100 rounded">
      <h1>Theme Machine</h1>
      <hr className="text-primary-100 mb-3" />
      <p>Intro sentence here.</p>

      <h2>Redux Test Component</h2>
      <Starter />
      <div className="grid gap-3 grid-cols-12">
        <Options />
        <section className="col-span-8 ">
          <h2>Result</h2>
          <div className="rounded border border-solid border-primary-300 pb-3 px-5">
            <h3 className="h1">Heading 1</h3>
            <h3 className="h2">Heading 2</h3>
            <h3 className="h3">Heading 3</h3>
            <h3 className="h4">Heading 4</h3>
            <h3 className="h5">Heading 5</h3>
            <h3 className="h6">Heading 6</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>
        <section className="col-span-12">
          <h2>Code</h2>
          <div className="rounded border border-solid border-primary-300 pb-3 px-5">
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </section>
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
