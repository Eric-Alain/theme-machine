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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="py-10 mt-10 grow bg-gray-300 dark:bg-gray-900">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
