import React, { useState, useEffect, createContext } from "react"
import Snackbar from "../Snackbars/Snackbar"
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from "../Firebase/Firebase"

const Login = ({ setShowModal }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null
  })

  const [snackBar, setSnackbar] = useState({
    variant: "success",
    show: false,
    message: null
  })

  const SnackContext = createContext(snackBar)

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Create user account using email and password
      signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (e) {
      // Otherwise display the error message to the user
      setSnackbar({
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

  const [authShow, setAuthShow] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setAuthShow(true)
      } else {
        setAuthShow(false)
      }
      console.log("user Changed")
      console.log(auth)
    })
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-rows-1 gap-4">
        <div>
          <h2 className="h4 pb-0 mt-0 mb-0 pt-0 dark:text-tertiary-100 border-b border-solid border-primary-300">
            Login
          </h2>
        </div>

        {authShow ? (
          <>
            <p className="text-black">
              Welcome back,{" "}
              <strong className="font-bold">
                {auth.currentUser.displayName}
              </strong>
              ! You're signed in and ready to get themin'.
            </p>
            <div>
              <button
                className="p-2 text-primary-900 hover:bg-primary-900 hover:text-tertiary-100  hover:font-bold border border-primary-900 rounded transition-all"
                type="button"
                onClick={() => {
                  signOut(auth)
                }}
              >
                Logout
              </button>
              <button
                className="ml-3 p-2 bg-primary-900 text-tertiary-100 hover:bg-secondary-900 hover:text-primary-900 hover:font-bold border border-primary-900 rounded transition-all"
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
              <label className="block text-black" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded text-black"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-black" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full rounded text-black"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                className="p-2 bg-primary-900 text-tertiary-100 hover:bg-secondary-900 hover:text-primary-900 hover:font-bold border border-primary-900 rounded transition-all"
                type="submit"
              >
                Login
              </button>
            </div>
          </>
        )}

        <SnackContext.Provider value={{ snackBar, setSnackbar }}>
          <Snackbar snackObj={snackBar} setShow={setSnackbar} />
        </SnackContext.Provider>
      </div>
    </form>
  )
}

export default Login
