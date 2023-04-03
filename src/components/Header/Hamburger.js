import React from "react"
import PropTypes from "prop-types"

const Hamburger = ({ toggleHamburger, handleHamburgerClick }) => {
  const genericHamburgerLine = `h-[3px] w-6 my-1 rounded-full bg-tertiary-100 transition ease transform duration-300`
  return (
    <button
      className="absolute top-0 right-0 md:hidden group"
      title="Expand/collapse"
      onClick={handleHamburgerClick}
    >
      <div
        className={`${genericHamburgerLine} ${
          toggleHamburger
            ? "rotate-45 translate-y-[0.45rem] opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          toggleHamburger ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          toggleHamburger
            ? "-rotate-45 -translate-y-[0.45rem] opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  )
}

Hamburger.propTypes = {
  toggleHamburger: PropTypes.bool,
  handleHamburgerClick: PropTypes.func
}

export default Hamburger
