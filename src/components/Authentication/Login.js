// React
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// Firebase
import {
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail
} from "firebase/auth"

// Utils
import { randomStringFromArray, capitalizeFirstLetter } from "../../utils"

const Login = ({
  auth,
  authShow,
  setShowModal,
  passwordPlaceholder,
  setPasswordPlaceholder,
  passwordPlaceholders,
  snackBar,
  setSnackBar,
  showPasswordRecover,
  setShowPasswordRecover
}) => {
  /*************/
  /*STATE HOOKS*/
  /*************/

  // Form controls
  const [data, setData] = useState({
    email: "",
    recoveryEmail: "",
    password: "",
    error: null
  })

  /******************/
  /*USE EFFECT HOOKS*/
  /******************/
  useEffect(() => {
    setPasswordPlaceholder(
      randomStringFromArray(passwordPlaceholder, passwordPlaceholders)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /********************/
  /*HANDLERS/LISTENERS*/
  /********************/

  // Update form values
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // Override default behaviour on form submission
  const handleSubmit = e => {
    e.preventDefault()
  }

  // Reset snack bar helper
  const hideSnackbar = () => {
    setSnackBar({
      ...snackBar,
      show: false
    })
  }

  // Handle when user wants to submit their info for login
  const handleLogin = async => {
    hideSnackbar()
    try {
      // Check if the email entered has an email and password sign in method
      fetchSignInMethodsForEmail(auth, data.email).then(result => {
        //If so, attempt to sign in using email and password
        if (result.some(str => str === "password")) {
          // Try to create user account using email and password
          signInWithEmailAndPassword(auth, data.email, data.password).catch(
            e => {
              if (e.code === "auth/account-exists-with-different-credential") {
                setSnackBar({
                  ...snackBar,
                  variant: "warning",
                  show: true,
                  message: (
                    <>
                      <p className="mb-3">
                        {capitalizeFirstLetter(
                          e.code
                            .replace(/^auth\/(.*?)$/gm, "$1")
                            .replace(/-/gm, " ")
                        )}{" "}
                        for "{e.customData.email}".
                      </p>
                      <p>Why don't you try signing in a different way?</p>
                    </>
                  )
                })
              } else {
                setSnackBar({
                  ...snackBar,
                  variant: "danger",
                  show: true,
                  message: (
                    <>
                      <p className="mb-3">
                        {capitalizeFirstLetter(
                          e.code
                            .replace(/^auth\/(.*?)$/gm, "$1")
                            .replace(/-/gm, " ")
                        )}
                      </p>
                    </>
                  )
                })
              }
            }
          )
        }
        // Otherwise, set a warning snackbar that an account exists with another method
        else {
          setSnackBar({
            ...snackBar,
            variant: "warning",
            show: true,
            message: (
              <>
                <p className="mb-3">
                  Account exists with different credential for "{data.email}".
                </p>
                <p>Why don't you try signing in a different way?</p>
              </>
            )
          })
        }
      })
    } catch (e) {
      // Otherwise display the error message to the user
      setSnackBar({
        ...snackBar,
        variant: "danger",
        show: true,
        message: (
          <p>
            {e.code}: {e.message}
          </p>
        )
      })
    }
  }

  // Handle UI actions when user clicks "forgot password" button
  const handlePasswordReset = () => {
    hideSnackbar()

    // Regex for testing valid email address format
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const isValidEmail = emailRegex.test(data.recoveryEmail)

    // If email is valid, then allow the submission and attempt to send password to provided email
    if (isValidEmail) {
      sendPasswordResetEmail(auth, data.recoveryEmail)
        .then(() => {
          // Provide success input
          setSnackBar({
            ...snackBar,
            variant: "success",
            show: true,
            message: (
              <p>Password recovery email sent to {data.recoveryEmail}!</p>
            )
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
    // Otherwise, notify notify user of incorrect email format
    else {
      setSnackBar({
        ...snackBar,
        variant: "danger",
        show: true,
        message: <p>Please enter a valid email.</p>
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-rows-1 gap-4">
          {authShow ? (
            <>
              <p className="text-black dark:text-tertiary-100">
                Welcome,{" "}
                <strong className="font-bold">
                  {auth.currentUser.displayName}
                </strong>
                ! You're signed in and ready to get themin'.
              </p>
              <div>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => {
                    signOut(auth)
                  }}
                >
                  Logout
                </button>
                <button
                  className="ml-3 btn-main"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Got it!
                </button>
              </div>
            </>
          ) : (
            <>
              {showPasswordRecover ? (
                <>
                  <div>
                    <label
                      className="block text-black dark:text-tertiary-100"
                      htmlFor="recoveryEmail"
                    >
                      Recovery email
                    </label>
                    <input
                      type="email"
                      name="recoveryEmail"
                      className="auth-input"
                      placeholder="example@email.com"
                      value={data.recoveryEmail}
                      onChange={handleChange}
                    />
                    <p className="small block text-black dark:text-tertiary-100">
                      A password recovery email will be sent to the address
                      provided if an account exists.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      className="block text-black dark:text-tertiary-100"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="auth-input"
                      placeholder="example@email.com"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-black dark:text-tertiary-100"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="auth-input"
                      placeholder={passwordPlaceholder}
                      value={data.password}
                      onChange={handleChange}
                    />
                    <button
                      className="text-[#2563EB] dark:text-[#3B82F6] hover:underline"
                      onClick={() => setShowPasswordRecover(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </form>

      {authShow ? null : (
        <div>
          <button
            className="btn-main mt-3"
            type="button"
            disabled={authShow}
            onClick={showPasswordRecover ? handlePasswordReset : handleLogin}
          >
            {showPasswordRecover ? "Submit" : "Login"}
          </button>
        </div>
      )}
    </>
  )
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  authShow: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  passwordPlaceholder: PropTypes.string,
  setPasswordPlaceholder: PropTypes.func,
  passwordPlaceholders: PropTypes.array,
  snackBar: PropTypes.object.isRequired,
  setSnackBar: PropTypes.func.isRequired,
  showPasswordRecover: PropTypes.bool.isRequired,
  setShowPasswordRecover: PropTypes.func.isRequired
}

export default Login
