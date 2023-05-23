// React
import * as React from "react"
import PropTypes from "prop-types"

const Footer = ({ version, author, siteUrl }) => {
  return (
    <footer className="container mx-auto py-3 dark:text-tertiary-100 px-3 md:px-0">
      <p>Version: {version}</p>
      <p>
        © {new Date().getFullYear()} &middot; Built by
        {` `}
        <a
          href={siteUrl}
          className="text-primary-900 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-900"
        >
          {author}
        </a>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  version: PropTypes.string,
  author: PropTypes.string,
  siteUrl: PropTypes.string
}

export default Footer
