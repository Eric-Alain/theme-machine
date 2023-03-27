import React, { useState } from "react"

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null
  })

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {}

  return (
    <form>
      <div className="grid grid-rows-1 gap-4">
        <div>
          <h2 className="h4 pb-0 mt-0 mb-0 pt-0 dark:text-tertiary-100 border-b border-solid border-primary-300">
            Login
          </h2>
        </div>
        <div>
          <label className="block text-black" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded"
            value={data.email}
            onChange={handleChange}
          />
          <p className="text-black">{data.email}</p>
        </div>
        <div>
          <label className="block text-black" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded"
            value={data.password}
            onChange={handleChange}
          />
          <p className="text-black">{data.password}</p>
        </div>

        <div>
          <button
            className="p-2 bg-primary-900 text-tertiary-100 hover:bg-secondary-900 hover:text-primary-900 hover:font-bold border border-primary-900 rounded transition-all"
            type="submit"
            onSubmit={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  )
}

export default Login
