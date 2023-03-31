import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import React, { useState, createContext } from "react"
import Snackbar from "../Snackbars/Snackbar"
import { auth } from "../Firebase/Firebase"

const Signup = () => {
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    // Display error message if password and confirm password fields don't match
    if (data.password !== data.confirmPassword) {
      setSnackbar({
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
      setSnackbar({
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-rows-1 gap-4">
        <div>
          <h2 className="h4 pb-0 mt-0 mb-0 pt-0 dark:text-tertiary-100 border-b border-solid border-primary-300">
            Sign up
          </h2>
        </div>
        <div>
          <label className="block text-black" htmlFor="displayName">
            User name
          </label>
          <input
            type="text"
            name="displayName"
            className="w-full rounded text-black"
            placeholder="What would you like us to call you?"
            value={data.displayName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-black" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded text-black"
            placeholder="example@email.com"
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
            placeholder="Super secret"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-black" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full rounded text-black"
            placeholder="Just to be sure"
            value={data.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            className="p-2 bg-primary-900 text-tertiary-100 hover:bg-secondary-900 hover:text-primary-900 hover:font-bold border border-primary-900 rounded transition-all"
            type="submit"
          >
            Sign up
          </button>
        </div>

        <SnackContext.Provider value={{ snackBar, setSnackbar }}>
          <Snackbar snackObj={snackBar} setShow={setSnackbar} />
        </SnackContext.Provider>
      </div>
    </form>
  )
}

export default Signup
