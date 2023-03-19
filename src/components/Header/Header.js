import React, { useState } from "react"
import PropTypes from "prop-types"
//import { Link } from "gatsby"

//Redux
import { useSelector, useDispatch } from "react-redux"
import { setTheme } from "../../state/actions/theme"
import { resetStore } from "../../state/actions/root"

//Components
import RadioButton from "../Options/RadioButton"
import BooleanModal from "../Modals/BooleanModal"

//Icon svgs from heroicons.com

const Header = ({ siteTitle }) => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)

  const handleThemeChange = e => {
    dispatch(setTheme(e.target.checked ? "dark" : "light"))
  }

  const [showModal, setShowModal] = useState(false)

  const handleThemeReset = () => {
    dispatch(resetStore())
    setShowModal(false)
  }

  return (
    <section className="bg-primary-900 dark:bg-gray-700 fixed w-full z-10">
      <header className="container mx-auto text-white py-3 px-2 lg:px-0">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-8">{siteTitle}</div>
          <div className="col-span-1 flex justify-self-end justify-items-end">
            <button
              onClick={() => setShowModal(true)}
              className="text-tertiary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-secondary-900"
            >
              Reset
            </button>
            <BooleanModal
              showModal={showModal}
              setShowModal={setShowModal}
              callback={handleThemeReset}
            />
          </div>
          <div className="col-span-1 flex justify-self-end justify-items-end">
            <div className="justify-self-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-6 h-6${
                  theme !== "dark" ? " " : " text-gray-500"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
              {theme !== "dark" ? (
                <div className="w-[70%] transform translate-x-[25%] border-b mt-[2px] border-gray-400" />
              ) : null}
            </div>
            <div className="mx-1">
              <RadioButton
                id="theme-toggle-radio"
                sliderClasses="bg-primary-900 h-6 w-11 border rounded-full peer after:bg-white after:border-tertiary-300 after:h-5 after:w-5 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:border after:rounded-full after:transition-all peer-checked:after:bg-secondary-300 peer-checked:after:border-white peer-checked:bg-primary-900 peer-focus:ring-secondary-800 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-2 dark:bg-gray-900 dark:border-tertiary-100 dark:after:border-tertiary-100 dark:peer-focus:ring-gray-900 dark:peer-checked:after:bg-gray-600 dark:peer-checked:after:bg-gray-600 dark:peer-checked:after:border-tertiary-100 dark:peer-checked:bg-gray-900 dark:peer-focus:ring-tertiary-100"
                value={theme === "dark" ? true : false}
                handleRadioChange={handleThemeChange}
              />
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-5 mt-[2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
              {theme === "dark" ? (
                <div className="w-[70%] transform translate-x-[25%] border-b mt-[2px] border-gray-400" />
              ) : null}
            </div>
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
