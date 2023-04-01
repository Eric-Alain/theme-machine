import React, { useState, useEffect, createContext } from "react"
import Snackbar from "../Snackbars/Snackbar"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
const Login = ({
  auth,
  authShow,
  setShowModal,
  passwordPlaceholder,
  setPasswordPlaceholder,
  passwordPlaceholders
}) => {
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

  useEffect(() => {
    setPasswordPlaceholder(
      passwordPlaceholders[
        Math.floor(Math.random() * passwordPlaceholders.length)
      ]
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

        <SnackContext.Provider value={{ snackBar, setSnackbar }}>
          <Snackbar snackObj={snackBar} setShow={setSnackbar} />
        </SnackContext.Provider>
      </div>
    </form>
  )
}

export default Login
