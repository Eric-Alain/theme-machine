//React
import React from "react"
import PropTypes from "prop-types"

const BooleanModal = ({ showModal, setShowModal, callback }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-end justify-between rounded-t bg-primary-900 dark:bg-gray-700 dark:text-tertiary-100">
                  <h3 className="ml-3 my-0 pt-2 pb-1 text-tertiary-100">
                    Are you certain?
                  </h3>
                  <button
                    className="mr-3 my-0 pt-2 pb-1 bg-transparent text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-tertiary-100 opacity-50 hover:opacity-100 text-3xl block outline-none focus:outline-none transition-all">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative mx-3 my-5 flex-auto">
                  <p className="text-black dark:text-white">
                    Are you sure you want to reset all code and styles? This
                    action <u>cannot</u> be undone.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end mx-3 mb-5 rounded-b">
                  <button
                    className="bg-tertiary-100 hover:bg-primary-900 dark:bg-gray-700 dark:hover:bg-gray-400 text-black dark:text-tertiary-100 hover:text-tertiary-100 dark:hover:text-gray-900 border border-solid border-primary-900 dark:border-gray-400 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#b91c1c] text-tertiary-100 hover:bg-[#7f1d1d] border border-solid border-black dark:border-gray-400 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      callback()
                    }}
                  >
                    Reset settings
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

BooleanModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  callback: PropTypes.func
}

export default BooleanModal
