import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail
} from "firebase/auth"
import { randomStringFromArray } from "../../utils"

const Login = ({
  auth,
  authShow,
  setShowModal,
  passwordPlaceholder,
  setPasswordPlaceholder,
  passwordPlaceholders,
  snackBar,
  setSnackBar
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null
  })

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Check if the email entered has an email and password sign in method
      fetchSignInMethodsForEmail(auth, data.email).then(result => {
        console.log(result)
        //If so, attempt to sign in using email and password
        if (result.some(str => str === "password")) {
          console.log("called")
          // Create user account using email and password
          signInWithEmailAndPassword(auth, data.email, data.password)
        }

        // Otherwise, set a warning snackbar that an account exists with another method
        else {
          setSnackBar({
            ...snackBar,
            variant: "warning",
            show: true,
            message: (
              <p>
                It seems this email is associated to a different sign-in method.
                Why don't you try logging using a sign-in provider?
              </p>
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

  useEffect(() => {
    setPasswordPlaceholder(
      randomStringFromArray(passwordPlaceholder, passwordPlaceholders)
    )
  }, [])

  return (
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
            </div>
            <div>
              <button className="btn-main" type="submit" disabled={authShow}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  )
}

Login.propTypes = {
  auth: PropTypes.object,
  authShow: PropTypes.bool,
  setShowModal: PropTypes.func,
  passwordPlaceholder: PropTypes.string,
  setPasswordPlaceholder: PropTypes.func,
  passwordPlaceholders: PropTypes.array,
  snackBar: PropTypes.object,
  setSnackBar: PropTypes.func
}

export default Login
