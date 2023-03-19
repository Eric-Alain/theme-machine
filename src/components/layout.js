import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

//Redux
import { useSelector } from "react-redux"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          version
          author
          siteUrl
        }
      }
    }
  `)

  const theme = useSelector(state => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute("class", theme)
  }, [theme])

  return (
    <div className="flex flex-col bg-gray-300 dark:bg-gray-900 min-h-screen">
      <Header siteTitle={data.site.siteMetadata?.title || `Theme Machine`} />
      <div className="py-10 mt-10 grow bg-gray-300 dark:bg-gray-900">
        <main>{children}</main>
      </div>
      <Footer
        version={data.site.siteMetadata?.version}
        author={data.site.siteMetadata?.author || `Eric Alain`}
        siteUrl={data.site.siteMetadata?.siteUrl || `https://ericalain.ca`}
      />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
