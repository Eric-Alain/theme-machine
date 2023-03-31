//React
import React, { useState } from "react"
import PropTypes from "prop-types"

import Login from "../Authentication/Login"
import Signup from "../Authentication/Signup"

const AuthenticateModal = ({ showModal, setShowModal }) => {
  const [signUp, setSignUp] = useState(false)
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-1/4 relative my-6 mx-auto">
              {/*content*/}
              <div className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-end justify-between rounded-t bg-primary-900 dark:bg-gray-700 dark:text-tertiary-100">
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
                      <button onClick={() => setSignUp(true)}>
                        <h3 className="ml-3 my-0 pt-2 pb-1 text-tertiary-100">
                          Sign up
                        </h3>
                      </button>
                    </div>
                  </div>

                  <button
                    className="mr-3 my-0 pt-2 pb-1 bg-transparent text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="ml-2 text-tertiary-100 opacity-50 hover:opacity-100 text-3xl block outline-none focus:outline-none transition-all">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative mx-3 mt-3 mb-5 flex-auto">
                  {!signUp ? (
                    /*Login*/
                    <Login setShowModal={setShowModal} />
                  ) : (
                    /*Sign up*/
                    <Signup />
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
