//React
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"

const GoogleAuth = ({ auth, snackBar, setSnackBar }) => {
  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly")

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      //.then(result => {})
      .catch(e => {
        if (e.code === "auth/account-exists-with-different-credential") {
          setSnackBar({
            ...snackBar,
            variant: "warning",
            show: true,
            message: (
              <>
                <p className="mb-3">
                  It seems that an account was created for "{e.customData.email}
                  " using a different sign-in method.
                </p>
                <p>Why don't you try logging using a sign-in provider?</p>
              </>
            )
          })
        }
      })
  }
  return (
    <button
      className="w-fit p-2 hover:bg-gray-200 border-primary-900 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-500 border rounded transition-all"
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
        <path fill="#FBBC05" d="M0 37V11l17 13z" clipPath="url(#b)"></path>
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
  )
}

GoogleAuth.propTypes = {
  auth: PropTypes.object.isRequired,
  snackBar: PropTypes.object,
  setSnackBar: PropTypes.func
}

export default GoogleAuth