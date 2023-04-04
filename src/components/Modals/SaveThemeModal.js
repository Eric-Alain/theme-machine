//React
import React, { useState, useEffect, createContext } from "react"
import PropTypes from "prop-types"

import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore"

import Snackbar from "../Snackbars/Snackbar"
import { capitalizeFirstLetter } from "../../utils"

//Redux
import { useSelector } from "react-redux"

const SaveThemeModal = ({ auth, db, showModal, setShowModal }) => {
  const [uid, setUid] = useState(null)

  useEffect(() => {
    if (auth.currentUser) {
      setUid(auth.currentUser.uid)
    }
  }, [auth])

  const [snackBar, setSnackBar] = useState({
    variant: "success",
    show: false,
    message: null
  })

  const SnackContext = createContext(snackBar)

  const colors = useSelector(state => state.styles.colors)
  const fonts = useSelector(state => state.styles.fonts)
  const shape = useSelector(state => state.styles.shape)

  const styles = useSelector(state => state.styles)
  const code = useSelector(state => state.code)

  const [data, setData] = useState({
    themeName: "",
    error: null
  })

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Reset our snackbar
    setSnackBar({
      ...snackBar,
      variant: "success",
      show: false,
      message: <p></p>
    })

    // Try catch operation with firestore
    try {
      const themeRef = doc(db, `users`, uid, "themes", data.themeName)
      const themeSnap = await getDoc(themeRef)

      if (themeSnap.exists()) {
        // This means we know that a theme with this name already exists in our collection, return an error for the snackbar
        const error = new Error("This theme already exists!")
        error.code = "theme-already-exists"
        throw error
      } else {
        // This means it doesn't exist, so we should create it
        await setDoc(doc(db, `users`, uid, "themes", data.themeName), {
          state: {
            styles: styles,
            code: code
          },
          timestamp: serverTimestamp()
        })
        setSnackBar({
          ...snackBar,
          variant: "success",
          show: true,
          message: <p>Theme "{data.themeName}" saved!</p>
        })
      }
    } catch (e) {
      setSnackBar({
        ...snackBar,
        variant: "danger",
        show: true,
        message: (
          <p>
            {capitalizeFirstLetter(
              e.code.replace(/^auth\/(.*?)$/gm, "$1").replace(/-/gm, " ")
            )}
          </p>
        )
      })
    }
  }

  const [roundnessDesc, setRoundnessDesc] = useState("")

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

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-[360px] relative my-6 mx-auto">
              {/*content*/}
              <div className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none">
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
                          className="auth-input"
                          placeholder="What do you want to call this theme?"
                          value={data.themeName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <button className="btn-main" type="submit">
                          Save
                        </button>
                      </div>
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
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
}

export default SaveThemeModal
