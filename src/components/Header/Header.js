import * as React from "react"
import PropTypes from "prop-types"
//import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  return (
    <section className="bg-primary-900">
      <header className="container mx-auto text-white py-3 px-2">
        <div className="grid grid-cols-12 gap-2 justify-around content-end">
          <div className="col-span-12 md:col-span-9">
            {siteTitle}            
          </div>
          <div className="col-span-12 md:col-span-1 self-end md:justify-self-end">
            <a href="#" className="hover:text-secondary-900">
              Item 1
            </a>
          </div>
          <div className="col-span-12 md:col-span-1 self-end md:justify-self-end">
            <a href="#" className="hover:text-secondary-900">
              Item 2
            </a>
          </div>
          <div className="col-span-12 md:col-span-1 self-end md:justify-self-end">
            <a href="#" className="hover:text-secondary-900">
              Item 2
            </a>
          </div>
        </div>
      </header>
    </section>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
