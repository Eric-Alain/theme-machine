// React
import React, { useState, useEffect, useCallback, useMemo } from "react"

// Components
import Layout from "../components/layout"
import Seo from "../components/seo"
import Options from "../components/Options/Options"
import Result from "../components/Result/Result"
import Code from "../components/Code/Code"

const IndexPage = ({ location }) => {
  const [width, setWidth] = useState(null)

  // Set initial width on component mount
  useEffect(() => {
    if (typeof window === "undefined") return
    setWidth(window.innerWidth)
  }, [])

  // Use useCallback for the handleResize function to prevent from being recreated on each render
  const handleResize = useCallback(() => setWidth(window.innerWidth), [])

  // Listen for window resize, setState of width any time window resizes
  useEffect(() => {
    if (typeof window === "undefined") return
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Use useMemo to store the Layout component instead of calling it on each render
  const layout = useMemo(
    () => (
      <Layout width={width} location={location}>
        <Seo title="Home" />
        <div className="container mx-auto pt-1 pb-5 px-5 bg-tertiary-100 dark:bg-gray-900 dark:text-tertiary-100 border border-primary-300 rounded">
          <h1 className="dark:text-tertiary-100">Theme Machine</h1>
          <p className="mb-3">
            Theme Machine is a quick and easy-to-use tool for mockups of your
            web design. It allows you to quickly play around with colors, fonts
            and shapes, giving you a visual representation of your design before
            you even start coding.
          </p>
          <p className="mb-3">
            With Theme Machine, you save time by not having to write boiler code
            but still have the flexibility to create stunning websites that
            stand out from the crowd.
          </p>
          <hr className="border-primary-300 mb-3" />
          <div className="grid gap-3 grid-cols-12">
            <Options />
            <Result width={width} />
            <Code />
          </div>
        </div>
      </Layout>
    ),
    [width]
  )
  return layout
}

export const Head = () => <Seo title="Home" />

export default IndexPage
