//React
import React from "react"
import PropTypes from "prop-types"

import { signInWithPopup, FacebookAuthProvider } from "firebase/auth"

const FacebookAuth = ({ auth }) => {
  const facebookProvider = new FacebookAuthProvider()

  const handleFacebookAuth = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
      })
      .catch(e => {
        if (e.code === "auth/account-exists-with-different-credential") {
          console.log(FacebookAuthProvider.credentialFromError(e))
          console.log(e.customData.email)
        }
      })
  }
  return (
    <button
      className="w-fit p-2 hover:bg-gray-200 border-primary-900 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-500 border rounded transition-all"
      title="Facebook"
      onClick={handleFacebookAuth}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 506.86 506.86"
        className="h-10 w-10"
      >
        <path
          fill="#1877f2"
          d="M506.86 253.43C506.86 113.46 393.39 0 253.43 0S0 113.46 0 253.43c0 126.49 92.68 231.34 213.83 250.35V326.69h-64.35v-73.26h64.35V197.6c0-63.52 37.84-98.6 95.72-98.6 27.73 0 56.73 5 56.73 5v62.36h-31.95c-31.49 0-41.3 19.54-41.3 39.58v47.54h70.28l-11.23 73.26H293v177.04c121.18-19.01 213.86-123.86 213.86-250.35Z"
        />
        <path
          fill="#fff"
          d="m352.08 326.69 11.23-73.26H293v-47.54c0-20 9.81-39.58 41.3-39.58h31.95V104s-29-5-56.73-5c-57.88 0-95.72 35.08-95.72 98.6v55.83h-64.32v73.26h64.35v177.09a256.11 256.11 0 0 0 79.2 0V326.69Z"
        />
      </svg>
    </button>
  )
}

FacebookAuth.propTypes = {
  auth: PropTypes.object.isRequired
}

export default FacebookAuth
