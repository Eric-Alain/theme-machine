// React
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useCallback
} from "react"
import PropTypes from "prop-types"

// Firebase
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

// Components
import Snackbar from "../Snackbars/Snackbar"
import ProceedOrCancel from "./ProceedOrCancel"

// Redux
import { useSelector } from "react-redux"

const SaveThemeModal = ({
  auth,
  db,
  showModal,
  setShowModal,
  showProceedOrCancel,
  handleProceedOrCancel
}) => {
  /*************/
  /*STATE HOOKS*/
  /*************/

  // For storing data about our firebase user
  const [user, setUser] = useState(null)

  // Form control values
  const [data, setData] = useState({
    themeName: "",
    error: null
  })

  // Snackbar alert state
  const [snackBar, setSnackBar] = useState({
    variant: "success",
    show: false,
    message: null
  })

  // State for describing roundness of current theme
  const [roundnessDesc, setRoundnessDesc] = useState("")

  /************/
  /*VARS/INITS*/
  /************/

  // Context needed for snackbar state for nested components
  const SnackContext = createContext(snackBar)

  // Redux useSelector hooks
  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)
  const styles = useSelector(state => state.styles)
  const code = useSelector(state => state.code)

  /******************/
  /*USE EFFECT HOOKS*/
  /******************/

  // Firebase, listen for change in authenticated state
  useEffect(() => {
    // Subscribe to user authentication
    onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        setUser(currentUser)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, db])

  // Update term used to describe roundness when it changes
  useEffect(() => {
    const describeRoundness = () => {
      if (shape.radius > 0 && shape.radius <= 4) {
        return "A little bit round"
      } else if (shape.radius > 4 && shape.radius <= 6) {
        return "Round"
      } else if (shape.radius > 6 && shape.radius <= 10) {
        return "Definitely round"
      } else if (shape.radius > 10 && shape.radius <= 15) {
        return "Pretty dang round"
      } else if (shape.radius > 16) {
        return "Doesn't get any rounder"
      } else {
        return "Not sure!"
      }
    }
    setRoundnessDesc(describeRoundness())
  }, [shape.radius])

  /********************/
  /*HANDLERS/LISTENERS*/
  /********************/

  // Handle input field value changes
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // Callback handler to save theme to user's firebase profile
  const writeTheme = async () => {
    try {
      // If user it authenticated
      if (user.uid) {
        // Set doc at specific end point
        await setDoc(doc(db, "users", user.uid, "themes", data.themeName), {
          state: {
            styles: styles,
            code: code,
            palette: data.themeName
          },
          timestamp: serverTimestamp()
        })

        await setDoc(doc(db, "users", user.uid), {
          userInfo: {
            name: user.displayName,
            email: user.email,
            uuid: user.uid
          },
          timestamp: serverTimestamp()
        })
        // Leave a nice message
        setSnackBar({
          ...snackBar,
          variant: "success",
          show: true,
          message: <p>Theme "{data.themeName}" saved!</p>
        })
      } else {
        // Otherwise alert user of issue
        setSnackBar({
          ...snackBar,
          variant: "danger",
          show: true,
          message: <p>You need to be logged in to save this theme.</p>
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Override form default, for some reason, can't simply use form submit
  const handleSubmit = e => {
    e.preventDefault()
  }

  // Handle save button click
  const handleClick = async () => {
    // Reset our snackbar
    setSnackBar({
      ...snackBar,
      variant: "success",
      show: false,
      message: <p></p>
    })

    // Try catch operation with firestore
    try {
      // If user is authenticated
      if (user.uid) {
        // Create end point ref and call it
        const themeRef = doc(db, "users", user.uid, "themes", data.themeName)
        const themeSnap = await getDoc(themeRef)
        // If it exists
        if (themeSnap.exists()) {
          // Show user proceed or cancel menu to decide if they want to overwrite the theme
          handleProceedOrCancel("save-1", true)
        } else {
          // This means it doesn't exist, so we should create it
          writeTheme()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  // Listen for click outside of modal and close modal
  const saveRef = useRef()

  const handleContext = useCallback(
    e => {
      if (saveRef.current && !saveRef.current.contains(e.target)) {
        setShowModal(false)
      }
    },
    [setShowModal]
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleContext)
    return () => {
      document.removeEventListener("mousedown", handleContext)
    }
  }, [handleContext])

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-[360px] relative my-6 mx-auto">
              {/*content*/}
              <div
                className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none"
                onClick={handleContext}
                ref={saveRef}
              >
                {/*header*/}
                <div className="flex items-center justify-between rounded-t bg-primary-900 dark:bg-gray-700 dark:text-tertiary-100">
                  <div>
                    <h3 className="ml-3 my-0 pt-2 pb-1 text-tertiary-100">
                      Save theme
                    </h3>
                  </div>
                  <button
                    className="mr-3 bg-transparent text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-tertiary-100 opacity-50 hover:opacity-100 text-3xl block outline-none focus:outline-none transition-all">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative mx-3 mt-3 mb-5 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <h4 className="h5 mt-0 mb-3 py-0 text-black dark:text-tertiary-100 border-b border-primary-300 dark:border-gray-400">
                      Theme summary
                    </h4>
                    <ul className="unstyled text-black dark:text-tertiary-100 transition-all">
                      <li className="flex justify-between mb-1">
                        <div>Primary color</div>
                        <div className="flex">
                          <span>{colors.primary}</span>
                          <div
                            className="ml-3 h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                            style={{ backgroundColor: colors.primary }}
                          ></div>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>Secondary color</div>
                        <div className="flex">
                          <span>{colors.secondary}</span>
                          <div
                            className="ml-3 h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                            style={{ backgroundColor: colors.secondary }}
                          ></div>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>Tertiary color</div>
                        <div className="flex">
                          <span>{colors.tertiary}</span>
                          <div
                            className="ml-3 h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                            style={{ backgroundColor: colors.tertiary }}
                          ></div>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>Background color</div>
                        <div className="flex">
                          <span>{colors.background}</span>
                          <div
                            className="ml-3 h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                            style={{ backgroundColor: colors.background }}
                          ></div>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>Foreground color</div>
                        <div className="flex">
                          <span>{colors.foreground}</span>
                          <div
                            className="ml-3 h-6 w-6 rounded border border-primary-300 dark:border-gray-400"
                            style={{ backgroundColor: colors.foreground }}
                          ></div>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>Heading font</div>
                        <div className="flex">
                          <span
                            style={{
                              fontFamily: `${fonts.heading.replace(
                                /^[']*(.*?)[']*,.*$$/gm,
                                "$1"
                              )}`
                            }}
                          >
                            {fonts.heading.replace(
                              /^[']*(.*?)[']*,.*$$/gm,
                              "$1"
                            )}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>General font</div>
                        <div className="flex">
                          <span
                            style={{
                              fontFamily: `${fonts.general.replace(
                                /^[']*(.*?)[']*,.*$$/gm,
                                "$1"
                              )}`
                            }}
                          >
                            {fonts.general.replace(
                              /^[']*(.*?)[']*,.*$$/gm,
                              "$1"
                            )}
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between mb-1">
                        <div>Rounded</div>
                        <div>{shape.rounded ? "Yup" : "Nope"}</div>
                      </li>
                      {shape.rounded ? (
                        <li className="flex justify-between mb-1">
                          <div>How round?</div>
                          <div>{roundnessDesc}</div>
                        </li>
                      ) : null}
                    </ul>
                    <hr className="mb-3 border-primary-300 dark:border-gray-400" />
                    <div className="grid grid-rows-1 gap-4">
                      <div>
                        <label
                          className="block text-black dark:text-tertiary-100"
                          htmlFor="themeName"
                        >
                          Theme name
                        </label>
                        <input
                          type="text"
                          name="themeName"
                          aria-label="themeName"
                          className="auth-input"
                          placeholder="What do you want to call this theme?"
                          value={data.themeName}
                          onChange={handleChange}
                        />
                      </div>
                      <div
                        className={
                          showProceedOrCancel["save-1"] ? "hidden" : ""
                        }
                      >
                        <button
                          className="btn-main"
                          type="button"
                          onClick={handleClick}
                        >
                          Save
                        </button>
                      </div>

                      {/* Load theme proceed or cancel */}
                      <ProceedOrCancel
                        index={`save-1`}
                        message="A theme with this name already exists. Do you want to overwrite it?"
                        showProceedOrCancel={showProceedOrCancel}
                        handleProceedOrCancel={handleProceedOrCancel}
                        proceedCallbacks={[() => writeTheme()]}
                      />

                      <SnackContext.Provider value={{ snackBar, setSnackBar }}>
                        <Snackbar snackObj={snackBar} setShow={setSnackBar} />
                      </SnackContext.Provider>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

SaveThemeModal.propTypes = {
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showProceedOrCancel: PropTypes.object,
  handleProceedOrCancel: PropTypes.func
}

export default SaveThemeModal
