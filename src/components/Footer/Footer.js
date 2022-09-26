import * as React from "react"

const Footer = () => {
  return (
    <footer className="container mx-auto py-3 px-2">
      © {new Date().getFullYear()} &middot; Built by
      {` `}
      By:{" "}
      <a href="https://ericalain.ca" className="hover:text-secondary-900">
        Eric Alain
      </a>
    </footer>
  )
}

export default Footer
