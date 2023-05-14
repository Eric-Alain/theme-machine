//React
import React, { useEffect, useRef, useCallback } from "react"
import PropTypes from "prop-types"

const BooleanModal = ({ showModal, setShowModal, callback }) => {
  // Listen for click outside of modal and close modal
  const boolRef = useRef()

  const handleContext = useCallback(
    e => {
      if (boolRef.current && !boolRef.current.contains(e.target)) {
        setShowModal(false)
      }
    },
    [setShowModal]
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleContext)
    return () => {
      document.removeEventListener("mousedown", handleContext)
    }
  }, [handleContext])
  
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[360px] my-6 mx-auto">
              {/*content*/}
              <div
                className="rounded-md shadow-lg relative flex flex-col w-full bg-tertiary-100 dark:bg-gray-900 border border-solid border-primary-300 outline-none focus:outline-none"
                onClick={handleContext}
                ref={boolRef}
              >
                {/*header*/}
                <div className="flex items-center justify-between rounded-t bg-primary-900 dark:bg-gray-700 dark:text-tertiary-100">
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
                <div className="flex items-center justify-start mx-3 mb-5 rounded-b">
                  <button
                    className="btn-main"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="ml-3 btn-danger"
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
