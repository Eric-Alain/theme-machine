//React
import React, { useState } from "react"
import PropTypes from "prop-types"

import Login from "../Authentication/Login"
import Signup from "../Authentication/Signup"

const Snackbar = ({ variant, children, show, setShow }) => {
  return (
    <div
      class="bg-[#c70b0b] text-tertiary-100 font-bold uppercase text-sm transition-all px-4 py-3 rounded max-w-[65ch]"
      role="alert"
    >
      <div className="flex flex-row items-start">
        <div>{children}</div>
        <div>
          <button className="p-0 m-0 -mt-[1px] hover:bg-tertiary-100 hover:text-black hover:border-black transition-colors rounded">
            <svg
              class="fill-current h-6 w-6"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Snackbar
