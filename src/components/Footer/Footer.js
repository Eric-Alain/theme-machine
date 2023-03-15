//React
import * as React from "react"
import PropTypes from "prop-types"

const Footer = ({ author, siteUrl }) => {
  return (
    <footer className="container mx-auto py-3 dark:text-tertiary-100">
      © {new Date().getFullYear()} &middot; Built by
      {` `}
      <a
        href={siteUrl}
        className="text-primary-900 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-900"
      >
        {author}
      </a>
    </footer>
  )
}

Footer.propTypes = {
  author: PropTypes.string,
  siteUrl: PropTypes.string
}

export default Footer
