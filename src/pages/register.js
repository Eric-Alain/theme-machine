import React, { useState, useContext } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Register = () => {
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
      console.log("success")
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Layout>
      <Seo title="Register" />
      <div className="container max-w-lg mx-auto pt-1 pb-5 px-5 border bg-tertiary-100 dark:bg-gray-900 dark:border-tertiary-100 dark:text-tertiary-100 rounded">
        <h1 className="dark:text-tertiary-100 border-b border-solid border-primary-300">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-1 gap-4">
            <div>
              <h2 className="h4 pb-0 mb-0 dark:text-tertiary-100">
                Create an account
              </h2>
            </div>
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
              <p>{data.email}</p>
            </div>
            <div>
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <p>{data.password}</p>
            </div>
            {data.error ? <p>{data.error}</p> : null}
            <div>
              <button
                className="p-2 bg-primary-900 text-tertiary-100 hover:bg-secondary-900 hover:text-primary-900 hover:font-bold border border-primary-900 rounded transition-all"
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Register
