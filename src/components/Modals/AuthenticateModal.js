//React
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from "../Firebase/Firebase"

import Login from "../Authentication/Login"
import Signup from "../Authentication/Signup"

const AuthenticateModal = ({ showModal, setShowModal }) => {
  const [signUp, setSignUp] = useState(false)

  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly")

  auth.languageCode = "it"

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(result)
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  const [passwordPlaceholder, setPasswordPlaceholder] = useState("")

  const passwordPlaceholders = [
    "My password is so secret, even I forget it.",
    "I used my ex's name as my password, but it was too easy.",
    "Changed password to 'incorrect.' Reminds me when I forget.",
    "My password's like a plant, needs change to stay healthy.",
    "My password's a mystery novel, full of twists and characters.",
    "My password's a good joke... nobody gets it.",
    "My password's a choose-your-own-adventure book. Not sure where it goes."
  ]

  const [authShow, setAuthShow] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setAuthShow(true)
      } else {
        setAuthShow(false)
      }
    })
  }, [])

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-1/4 relative my-6 mx-auto">
              {/*content*/}
              <div className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none">
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
                      <button onClick={() => setSignUp(false)}>
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
                      setShowModal={setShowModal}
                      passwordPlaceholder={passwordPlaceholder}
                      setPasswordPlaceholder={setPasswordPlaceholder}
                      passwordPlaceholders={passwordPlaceholders}
                    />
                  ) : (
                    /*Sign up*/
                    <Signup
                      auth={auth}
                      authShow={authShow}
                      passwordPlaceholder={passwordPlaceholder}
                      setPasswordPlaceholder={setPasswordPlaceholder}
                      passwordPlaceholders={passwordPlaceholders}
                    />
                  )}

                  {authShow ? null : (
                    <>
                      <hr className="mt-4 mb-3" />
                      <p className="mb-3 text-black dark:text-tertiary-100">
                        Or use a sign-in partner.
                      </p>
                      <button
                        className="w-fit p-2
				    hover:bg-gray-200
				    border-primary-900
				    dark:bg-gray-700
				    dark:hover:bg-gray-800
				    dark:border-gray-500
				    border rounded transition-all"
                        title="Google"
                        onClick={handleGoogleAuth}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 48 48"
                          className="h-10 w-10"
                        >
                          <defs>
                            <path
                              id="a"
                              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                            ></path>
                          </defs>
                          <clipPath id="b">
                            <use overflow="visible" xlinkHref="#a"></use>
                          </clipPath>
                          <path
                            fill="#FBBC05"
                            d="M0 37V11l17 13z"
                            clipPath="url(#b)"
                          ></path>
                          <path
                            fill="#EA4335"
                            d="M0 11l17 13 7-6.1L48 14V0H0z"
                            clipPath="url(#b)"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M0 37l30-23 7.9 1L48 0v48H0z"
                            clipPath="url(#b)"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M48 48L17 24l-4-3 35-10z"
                            clipPath="url(#b)"
                          ></path>
                        </svg>
                      </button>
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

export default AuthenticateModal
