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
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Firebase/Firebase"

// Components
import Login from "../Authentication/Login"
import Signup from "../Authentication/Signup"
import GoogleAuth from "../Authentication/GoogleAuth"
import FacebookAuth from "../Authentication/FacebookAuth"
import GithubAuth from "../Authentication/GithubAuth"
import Snackbar from "../Snackbars/Snackbar"

const AuthenticateModal = ({ showModal, setShowModal }) => {
  /*************/
  /*STATE HOOKS*/
  /*************/

  // Show sign up menu or not
  const [signUp, setSignUp] = useState(false)

  // Set random placeholder string for password input field
  const [passwordPlaceholder, setPasswordPlaceholder] = useState("")

  // Show menu based on whether use is authenticated or not
  const [authShow, setAuthShow] = useState(false)

  // Show different menu if user wishers to recover password
  const [showPasswordRecover, setShowPasswordRecover] = useState(false)

  // Snackbar alert state
  const [snackBar, setSnackBar] = useState({
    variant: "success",
    show: false,
    message: null
  })

  /************/
  /*VARS/INITS*/
  /************/

  // Context needed for snackbar state for nested components
  const SnackContext = createContext(snackBar)

  // Array of fun input placeholder strings
  const passwordPlaceholders = [
    "AllYourBaseAreBelongToUs",
    "passwordispassword",
    "NotTodayHackers!",
    "IHaveNoIdeaWhatIAmDoing",
    "letmeinpls123",
    "ILoveJavaScriptMoreThanMyDog",
    "idontlikemyboss",
    "LetMeInIAmNoHacker",
    "CanIHazPasswordPlz",
    "YouShallNotPass(word)"
  ]

  /******************/
  /*USE EFFECT HOOKS*/
  /******************/

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setAuthShow(true)
      } else {
        setAuthShow(false)
      }
    })
  }, [])

  /********************/
  /*HANDLERS/LISTENERS*/
  /********************/

  // Listen for click outside of modal and close modal
  const authRef = useRef()

  const handleContext = useCallback(
    e => {
      if (authRef.current && !authRef.current.contains(e.target)) {
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
                ref={authRef}
              >
                {/*header*/}
                <div className="flex items-center justify-between rounded-t bg-primary-900 dark:bg-gray-700 dark:text-tertiary-100">
                  <div className="w-full grid grid-cols-2 gap-2 justify-between">
                    <div
                      className={`${
                        !signUp ? "border-b-4 border-secondary-900 " : ""
                      }${
                        signUp ? "hover:border-primary-700 " : ""
                      }border-primary-900 transition-colors duration-500`}
                    >
                      <button
                        onClick={() => {
                          setSignUp(false)
                          setShowPasswordRecover(false)
                        }}
                      >
                        <h3 className="ml-3 my-0 pt-2 pb-1 text-tertiary-100">
                          Login
                        </h3>
                      </button>
                    </div>
                    <div
                      className={`${
                        signUp ? "border-b-4 border-secondary-900 " : ""
                      }${
                        !signUp ? "hover:border-primary-700 " : ""
                      }border-primary-900 transition-colors duration-500`}
                    >
                      <button
                        className={`${authShow ? " cursor-not-allowed" : ""}`}
                        onClick={() => setSignUp(true)}
                        disabled={authShow}
                      >
                        <h3 className="ml-3 my-0 pt-2 pb-1 text-tertiary-100">
                          Sign up
                        </h3>
                      </button>
                    </div>
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
                  {!signUp ? (
                    /*Login*/
                    <Login
                      auth={auth}
                      authShow={authShow}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      passwordPlaceholder={passwordPlaceholder}
                      setPasswordPlaceholder={setPasswordPlaceholder}
                      passwordPlaceholders={passwordPlaceholders}
                      snackBar={snackBar}
                      setSnackBar={setSnackBar}
                      showPasswordRecover={showPasswordRecover}
                      setShowPasswordRecover={setShowPasswordRecover}
                    />
                  ) : (
                    /*Sign up*/
                    <Signup
                      auth={auth}
                      authShow={authShow}
                      passwordPlaceholder={passwordPlaceholder}
                      setPasswordPlaceholder={setPasswordPlaceholder}
                      passwordPlaceholders={passwordPlaceholders}
                      snackBar={snackBar}
                      setSnackBar={setSnackBar}
                    />
                  )}
                  <div className="mt-3">
                    <SnackContext.Provider value={{ snackBar, setSnackBar }}>
                      <Snackbar snackObj={snackBar} setShow={setSnackBar} />
                    </SnackContext.Provider>
                  </div>
                  {authShow ? null : (
                    <>
                      <hr className="mt-4 mb-3" />
                      <p className="mb-3 text-black dark:text-tertiary-100">
                        Sign-in partners.
                      </p>
                      <div className="grid grid-cols-5 gap-4 justify-start">
                        <div>
                          <GoogleAuth
                            auth={auth}
                            snackBar={snackBar}
                            setSnackBar={setSnackBar}
                          />
                        </div>
                        <div>
                          <FacebookAuth
                            auth={auth}
                            snackBar={snackBar}
                            setSnackBar={setSnackBar}
                          />
                        </div>
                        <div>
                          <GithubAuth
                            auth={auth}
                            snackBar={snackBar}
                            setSnackBar={setSnackBar}
                          />
                        </div>
                      </div>
                    </>
                  )}
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

AuthenticateModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
}

export default AuthenticateModal
