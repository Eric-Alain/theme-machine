import * as React from "react"

const Footer = () => {
  return (
    <footer className="container mx-auto py-3 dark:text-tertiary-100">
      © {new Date().getFullYear()} &middot; Built by
      {` `}
      <a
        href="https://ericalain.ca"
        className="text-primary-900 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-900"
      >
        Eric Alain
      </a>
    </footer>
  )
}

export default Footer
