import * as React from "react"

const Footer = () => {
  return (
    <div>
      <div>
        <footer>
          © {new Date().getFullYear()} &middot; Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Footer
