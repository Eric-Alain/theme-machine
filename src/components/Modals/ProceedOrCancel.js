import React from "react"
import PropTypes from "prop-types"

const ProceedOrCancel = ({
  index,
  message,
  showProceedOrCancel,
  handleProceedOrCancel,
  proceedCallbacks,
  cancelCallbacks
}) => {
  return (
    <div
      className={`grid grid-cols-1 justify-start overflow-hidden${
        showProceedOrCancel[index] ? " mb-1 p-1 min-h-fit h-[5rem]" : " h-0 p-0"
      } transition-all`}
    >
      <div className="text-black dark:text-tertiary-100">{message}</div>
      <div className="grid grid-cols-10 gap-1 items-center">
        {/* Checkmark */}
        <div>
          <button
            className="rounded border border-transparent hover:bg-primary-100 dark:hover:bg-gray-900 dark:hover:border dark:hover:border-tertiary-100 transition-all"
            onClick={() =>
              handleProceedOrCancel(
                index,
                false,
                proceedCallbacks
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 20 20"
              className="h-6 w-6 rounded text-primary-600 hover:text-black dark:text-tertiary-100 transition-all"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 5L8 15l-5-4"
              ></path>
            </svg>
          </button>
        </div>

        {/* Close button */}
        <div>
          <button
            className="rounded border border-transparent hover:bg-primary-100 dark:hover:bg-gray-900 dark:hover:border dark:hover:border-tertiary-100 transition-all"
            onClick={() =>
              handleProceedOrCancel(
                index,
                false,
                cancelCallbacks
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 rounded text-primary-600 dark:text-tertiary-100 transition-all"
            >
              <g>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

ProceedOrCancel.propTypes = {
  index: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  showProceedOrCancel: PropTypes.object.isRequired,
  handleProceedOrCancel: PropTypes.func.isRequired,
  callbacks: PropTypes.arrayOf(PropTypes.func)
}

export default ProceedOrCancel
