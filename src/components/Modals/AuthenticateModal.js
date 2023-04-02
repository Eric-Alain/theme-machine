//React
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Firebase/Firebase"

import Login from "../Authentication/Login"
import Signup from "../Authentication/Signup"
import GoogleAuth from "../Authentication/GoogleAuth"
import FacebookAuth from "../Authentication/FacebookAuth"
import GithubAuth from "../Authentication/GithubAuth"

const AuthenticateModal = ({ showModal, setShowModal }) => {
  const [signUp, setSignUp] = useState(false)

  auth.languageCode = "it"

  const [passwordPlaceholder, setPasswordPlaceholder] = useState("")

  const passwordPlaceholders = [
    "My password is so secret, even I forget it.",
    "I used my ex's name as my password, but it was too easy.",
    "Changed password to 'incorrect.' Reminds me when I forget.",
    "My password's like a plant: it needs change to stay healthy.",
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
                      <div className="grid grid-cols-6 gap-4 justify-start">
                        <div>
                          <GoogleAuth auth={auth} />
                        </div>
                        <div>
                          <FacebookAuth auth={auth} />
                        </div>
                        <div>
                          <GithubAuth auth={auth} />
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
