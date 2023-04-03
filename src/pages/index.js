//React
import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Options from "../components/Options/Options"
import Result from "../components/Result/Result"
import Code from "../components/Code/Code"

const IndexPage = () => {
  /*Listener for viewport width, used for hamburger menu*/
  const [width, setWidth] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <Layout width={width}>
      <Seo title="Home" />
      <div className="container mx-auto pt-1 pb-5 px-5 bg-tertiary-100 dark:bg-gray-900 dark:text-tertiary-100 border border-primary-300 rounded">
        <h1 className="dark:text-tertiary-100">Theme Machine</h1>
        <p className="mb-3">
          Welcome to Theme Machine, a quick and easy sandbox for web designers
          and developers! Are you tired of wasting time on writing boiler code
          to get your web pages just right? Look no further than Theme Machine.
        </p>
        <p className="mb-3">
          Quickly and easily mock up your HTML and CSS styles with just a few
          clicks. Our intuitive interface allows you to play around with colors,
          fonts, and shapes, giving you a visual representation of your design
          before you even start coding. With Theme Machine, you can spend less
          time writing code and more time focusing on what really matters -
          creating stunning, user-friendly websites that stand out from the
          crowd. Try it out today and see the difference for yourself!
        </p>
        <hr className="border-primary-300 mb-3" />
        <div className="grid gap-3 grid-cols-12">
          <Options />
          <Result width={width} />
          <Code />
        </div>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
