import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { randomStringFromArray, capitalizeFirstLetter } from "../../utils"

const Signup = ({
  auth,
  authShow,
  passwordPlaceholder,
  setPasswordPlaceholder,
  passwordPlaceholders,
  snackBar,
  setSnackBar
}) => {
  /*************/
  /*STATE HOOKS*/
  /*************/

  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Display error message if password and confirm password fields don't match
    if (data.password !== data.confirmPassword) {
      setSnackBar({
        ...snackBar,
        variant: "danger",
        show: true,
        message: (
          <p>
            <strong className="font-bold">Uh oh!</strong> It looks like your
            passwords don't match. Please try again.
          </p>
        )
      })
      return
    }
    try {
      // Create user account using email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      // Wait for account to be created, update the user name key based on what was entered in sign up form
      await updateProfile(result.user, { displayName: data.displayName })

      // If succesful, display a nice l'il message
      setSnackBar({
        ...snackBar,
        variant: "success",
        show: true,
        message: (
          <p>
            <strong className="font-bold">
              Great job, {result.user.displayName}!
            </strong>{" "}
            It looks like you successfully created your account with{" "}
            {result.user.email}!
          </p>
        )
      })
    } catch (e) {
      // Otherwise display the error message to the user
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-rows-1 gap-4">
        <div>
          <label
            className="block text-black dark:text-tertiary-100 dark:text-tertiary-100"
            htmlFor="displayName"
          >
            User name
          </label>
          <input
            type="text"
            name="displayName"
            aria-labelledby="displayName"
            className="auth-input"
            placeholder="What would you like us to call you?"
            value={data.displayName}
            onChange={handleChange}
          />
        </div>
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
            aria-labelledby="email"
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
            aria-labelledby="password"
            className="auth-input"
            placeholder={passwordPlaceholder}
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            className="block text-black dark:text-tertiary-100"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            aria-labelledby="confirmPassword"
            className="auth-input"
            placeholder="Just to be sure."
            value={data.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {authShow ? (
          <>
            <div>
              <p className="text-black dark:text-tertiary-100">
                You're already signed up.
              </p>
            </div>
          </>
        ) : null}

        <div>
          <button
            className={`btn-main${authShow ? " cursor-not-allowed" : ""}`}
            type="submit"
            disabled={authShow}
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  )
}

Signup.propTypes = {
  auth: PropTypes.object,
  authShow: PropTypes.bool,
  passwordPlaceholder: PropTypes.string,
  setPasswordPlaceholder: PropTypes.func,
  passwordPlaceholders: PropTypes.array,
  snackBar: PropTypes.object,
  setSnackBar: PropTypes.func
}

export default Signup
