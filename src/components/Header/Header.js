// React
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { setTheme } from "../../state/actions/theme"
import { resetStore } from "../../state/actions/root"

// Components
import RadioButton from "../Options/RadioButton"
import AuthenticateModal from "../Modals/AuthenticateModal"
import UserProfileModal from "../Modals/UserProfileModal"
import SaveThemeModal from "../Modals/SaveThemeModal"
import BooleanModal from "../Modals/BooleanModal"
import LogoSvg from "./LogoSvg"
import Hamburger from "./Hamburger"

// Firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth, db, storage } from "../Firebase/Firebase"
import { ref, getDownloadURL, listAll } from "firebase/storage"

const Header = ({ siteTitle, width, location }) => {
  /*************/
  /*STATE HOOKS*/
  /*************/

  // Boolean for AuthenticateModal visibility
  const [showAuthenticateModal, setShowAuthenticateModal] = useState(false)

  // Boolean for UserProfileModal visibility
  const [showUserProfileModal, setShowUserProfileModal] = useState(false)

  // Boolean for SaveThemeModal visibility
  const [showSaveThemeModal, setShowSaveThemeModal] = useState(false)

  // Boolean for BooleanModal visibility
  const [showBooleanModal, setShowBooleanModal] = useState(false)

  // Boolean based on auth
  const [authShow, setAuthShow] = useState(false)

  // Store data about our user
  const [user, setUser] = useState(null)

  const defaultSrc =
    "data:image/svg+xml,%3Csvg xmlns='http:// www.w3.org/2000/svg' width='1080' height='1080' xml:space='preserve'%3E%3Cpath style='stroke:white;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;fill:%23fff;fill-rule:nonzero;opacity:1' transform='matrix(1.54 0 0 1.54 1 108.8)' d='M534.8 89.328c0 72.277 5.602 134 5.602 218.55 0 100.01-65.727 173.72-156.8 173.72h-67.2c-47.601 0-87.503-18.156-114.8-48.508-27.296-30.352-42-72.441-42-119.61 0-85.535 16.946-162.72 39.899-227.84 2.625-7.367 14.008-9.453 19.074-3.504l51.977 62.52c60.82-11.027 123.35-10.055 187.07 0l57.75-62.867c7.582-7.027 19.176-2.476 19.426 7.531zm-320.25 22.941c-13.094 40.719-23.434 85.598-28.699 133.97h5.426c9.515-29.191 36.898-50.434 69.125-50.434 38.148 0 69.52 29.785 72.449 67.246h34.3c2.934-37.465 34.302-67.246 72.45-67.246 32.227 0 59.609 21.246 69.125 50.434h8.398c-1.183-45.234-3.25-86.121-4.023-129.07l-42.875 46.934c-2.516 2.762-6.469 4.125-10.148 3.504-66.168-11.035-130.2-12.125-191.98 0-3.899.73-8.14-.8-10.676-3.852zm302.93 145.18h-6.125c.582 3.7 1.05 7.527 1.05 11.383 0 40.102-32.726 72.852-72.8 72.852-38.227 0-69.801-29.871-72.625-67.422h-33.95c-2.823 37.551-34.397 67.422-72.624 67.422-40.074 0-72.801-32.75-72.801-72.852 0-3.856.469-7.684 1.05-11.383h-4.023c-1.648 18.199-2.625 36.891-2.625 56.039 0 42.496 13.297 78.859 36.398 104.55 23.102 25.688 56 41.152 98 41.152h67.2c79.292 0 134.4-60.781 134.4-151.3 0-17.695-.169-34.332-.524-50.438zM350 321.894c9.277 0 16.801 5.02 16.801 11.207 0 5.336-5.644 9.902-13.125 11.031-3.21 21.137-2.894 46.52.875 66.895 1.203 6.246 5.586 10.328 10.148 12.258 5.566 2.227 11.254 2.047 14.875-1.574 2.063-2.11 5.856-2.153 7.965-.09 2.11 2.062 2.148 5.86.086 7.969-7.578 7.586-18.691 7.402-27.125 4.027-3.906-1.562-7.61-3.77-10.5-6.656-2.89 2.887-6.594 5.09-10.5 6.656-8.434 3.375-19.547 3.559-27.125-4.027-2.063-2.11-2.024-5.906.086-7.969 2.11-2.063 5.902-2.02 7.964.09 3.622 3.62 9.31 3.804 14.875 1.574 4.813-1.926 8.875-4.73 8.38-10.48-4.465-22.133-4.696-46.52-1.204-69.727-5.472-1.848-9.273-5.61-9.273-9.98-.07-7.352 8.05-11.067 16.8-11.208z'/%3E%3C/svg%3E"

  // Manage user display image icon in header
  const [displaySrc, setDisplaySrc] = useState(defaultSrc)

  // Boolean for toggling hamburger menu on mobile
  const [toggleHamburger, setToggleHamburger] = useState(false)

  // Manage state for menus where the user is presented with the option to proceed or to cancel (in our case, for loading or deleting themes)
  const [showProceedOrCancel, setShowProceedOrCancel] = useState({})

  /************/
  /*VARS/INITS*/
  /************/

  // Set language of Firebase auth to whatever device language user is using, affects things like automated email language
  auth.useDeviceLanguage()

  // Redux
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)

  /******************/
  /*USE EFFECT HOOKS*/
  /******************/

  // Listen for change in user authentication, use it to grab display image information from firebase storage
  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setAuthShow(true)
        setUser(currentUser)
        try {
          // Check if the path even exists first
          listAll(ref(storage, `images/${currentUser.uid}`)).then(list => {
            if (list.items.length > 0) {
              // Find all the prefixes and items.
              getDownloadURL(
                ref(storage, `images/${currentUser.uid}/displayImage`)
              )
                .then(url => {
                  if (url) {
                    setDisplaySrc(ref(url))
                  }
                })
                .catch(e => {
                  console.log(e)
                })
            }
          })
        } catch (e) {
          console.log(e)
        }
      } else {
        setAuthShow(false)
        dispatch(resetStore())
      }
    })
  }, [dispatch])

  // Listen for display image, listens to local storage change
  useEffect(() => {
    const handleStampUpdate = () => {
      // Work only once authed
      onAuthStateChanged(auth, currentUser => {
        if (currentUser) {
          try {
            // Check if the path even exists first
            listAll(ref(storage, `images/${currentUser.uid}`))
              .then(list => {
                if (list.items.length > 0) {
                  // Find all the prefixes and items.
                  getDownloadURL(
                    ref(storage, `images/${currentUser.uid}/displayImage`)
                  )
                    .then(url => {
                      if (url) {
                        setDisplaySrc(ref(url))
                      }
                    })
                    .catch(e => {
                      setDisplaySrc(defaultSrc)
                    })
                }
              })
              .catch(e => {
                setDisplaySrc(defaultSrc)
              })
          } catch (e) {
            console.log(e)
          }
        }
      })
    }
    window.addEventListener("storage", handleStampUpdate)
    return () => {
      window.removeEventListener("storage", handleStampUpdate)
    }
  }, [])

  /********************/
  /*HANDLERS/LISTENERS*/
  /********************/

  // Toggle web page between light and dark theme
  const handleThemeChange = e => {
    dispatch(setTheme(e.target.checked ? "dark" : "light"))
  }

  // Reset state of redux store back to default, removing any unsaved changes
  const handleThemeReset = () => {
    dispatch(resetStore())
    setShowBooleanModal(false)
  }

  // Handle menus where user must click either a checkmark or close button
  const handleProceedOrCancel = (key, bool, arrayOfFunctions) => {
    // Close out other proceed or cancel menus
    let objCopy = { ...showProceedOrCancel }

    for (let item of Object.keys(objCopy)) {
      objCopy[item] = false
    }

    // Show desired proceed or cancel menu
    objCopy = { ...objCopy, [key]: bool }

    // Set the state accordingly
    setShowProceedOrCancel(objCopy)

    // If we have any callback functions to run, run them
    if (arrayOfFunctions) {
      arrayOfFunctions.forEach(func => {
        func()
      })
    }
  }

  // Toggle hamburger menu
  const handleHamburgerClick = () => {
    setToggleHamburger(!toggleHamburger)
  }

  return (
    <section className="bg-primary-900 dark:bg-gray-700 fixed relative w-full z-10">
      <header className="container mx-auto text-white py-3 px-2 lg:px-0">
        <div
          className={`${
            toggleHamburger ? "h-[12rem] min-h-fit" : "h-14"
          } md:h-fit overflow-hidden md:overflow-visible transition-all duration-500 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 items-end relative`}
        >
          <div
            className="md:col-start-1 md:col-end-5 lg:col-start-1 lg:col-end-7 xl:col-start-1 xl:col-end-8"
            title={siteTitle}
          >
            <LogoSvg classNames="w-[6rem] h-auto" baseColor={"#fff"} />
          </div>
          <Hamburger
            toggleHamburger={toggleHamburger}
            handleHamburgerClick={handleHamburgerClick}
          />
          <hr
            className={`${
              toggleHamburger ? "opacity-100" : "opacity-0"
            } md:hidden transition-all duration-500 border-primary-300 mx-1`}
          />
          {/* Handle menu if we are on incorrect route */}
          {location.pathname === "/" ? (
            <div className="md:col-start-5 md:col-end-6 lg:col-start-7 lg:col-end-8 xl:col-start-8 xl:col-end-10 grid grid-cols-1 md:grid-cols-4 justify-self-end items-end w-full">
              <div className="xl:col-start-1 xl:col-end-3 justify-self-start md:justify-self-end">
                <button
                  onClick={
                    authShow
                      ? () => setShowUserProfileModal(true)
                      : () => setShowAuthenticateModal(true)
                  }
                  className="group text-tertiary-100 hover:text-secondary-900 dark:text-tertiary-100 dark:hover:text-secondary-900 transition-all"
                  title="Account options"
                >
                  {width > 768 ? (
                    authShow && user ? (
                      <div className="grid grid-cols-2 justify-self-end items-end">
                        <div className="mr-1">{user.displayName}</div>
                        <div>
                          <img
                            src={displaySrc}
                            alt="profile"
                            className="h-10 w-10 object-cover object-center rounded-[50px] border border-2 border-primary-300 dark:border-gray-400 group-hover:border-secondary-900 transition-all"
                            width="120"
                          />
                        </div>
                      </div>
                    ) : (
                      <svg
                        xmlns="http:// www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 md:translate-y-[3px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    )
                  ) : (
                    <span>Account</span>
                  )}
                </button>

                <AuthenticateModal
                  showModal={showAuthenticateModal}
                  setShowModal={setShowAuthenticateModal}
                />
                <UserProfileModal
                  auth={auth}
                  db={db}
                  storage={storage}
                  showModal={showUserProfileModal}
                  setShowModal={setShowUserProfileModal}
                  showProceedOrCancel={showProceedOrCancel}
                  handleProceedOrCancel={handleProceedOrCancel}
                />
              </div>
              <div className="xl:col-start-3 xl:col-end-4 justify-self-start md:justify-self-end">
                <button
                  onClick={() => setShowSaveThemeModal(true)}
                  className="text-tertiary-100 hover:text-secondary-900 dark:text-tertiary-100 dark:hover:text-secondary-900"
                >
                  Save
                </button>
                <SaveThemeModal
                  auth={auth}
                  db={db}
                  showModal={showSaveThemeModal}
                  setShowModal={setShowSaveThemeModal}
                  showProceedOrCancel={showProceedOrCancel}
                  handleProceedOrCancel={handleProceedOrCancel}
                />
              </div>
              <div className="xl:col-start-4 xl:col-end-5 justify-self-start md:justify-self-end">
                <button
                  onClick={() => setShowBooleanModal(true)}
                  className="text-tertiary-100 hover:text-secondary-900 dark:text-tertiary-100 dark:hover:text-secondary-900"
                >
                  Reset
                </button>
                <BooleanModal
                  showModal={showBooleanModal}
                  setShowModal={setShowBooleanModal}
                  callback={handleThemeReset}
                />
              </div>
            </div>
          ) : null}
          <div className="md:col-start-6 md:col-end-7 lg:col-start-8 lg:col-end-9 xl:col-start-10 xl:col-end-11 flex md:justify-self-end justify-items-end">
            <div className="justify-self-start">
              <svg
                xmlns="http:// www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`w-6 h-6 dark:text-gray-500`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
              <div
                className={`w-[70%] transform translate-x-[25%] border-b mt-[2px] border-gray-400 ${
                  theme !== "dark" ? "opacity-100" : "opacity-0"
                }`}
              />
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
                xmlns="http:// www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-5 mt-[2px] text-gray-500 dark:text-tertiary-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
              <div
                className={`w-[70%] transform translate-x-[25%] border-b mt-[2px] border-gray-400 ${
                  theme === "dark" ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
      </header>
    </section>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  width: PropTypes.number
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
